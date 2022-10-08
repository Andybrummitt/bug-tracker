const ApiError = require("../error/apiError");
const bcrypt = require('bcrypt');
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');
const Team = require("../models/Team");
const Ticket = require("../models/Ticket");
const Project = require("../models/Project");

const isValid = (input) => {
    if (input.length >= 6 && input.length <= 15) {
      return true;
    }
    return false;
  };

//  Register User
//  POST /api/auth/user/register
const registerUser = asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;
    const { teamName } = req;

    //  CHECK VALUES FROM REQ.BODY
    if(!username || !password){
        return next(ApiError.badRequest('Please include all required fields.'));
    }

    //  CHECK USERNAME AND PASSWORD IS VALID LENGTH
    if(!isValid(username) || !isValid(password)){
        return next(ApiError.badRequest("Usernames and passwords must be between 6 and 15 characters."))
      }

    //  CHECK FOR DUPLICATES
    const duplicate = await User.findOne({ username }).lean().exec();

    if(duplicate){
        return next(ApiError.conflict('A User with that name already exists.'));
    }

    //  HASH PASSWORD
    const saltRounds = 10;
    const hashedPass = await bcrypt.hash(password, saltRounds);

    const team = await Team.findOne({ teamName });

    if(team.members.length > 9){
        return ApiError.badRequest('Your team already has 10 members.')
    }

    //  CREATE USER AND STORE IN DB
    const userObj = { username, team: team._id, password: hashedPass };

    const user = await User.create(userObj);

    
    if(user){
        //  ADD USER TO TEAM MEMBERS
        team.members.push(user._id);
        team.save();
        //  LOGIN USER
        loginUser(req, res, next);
    }
    else {
        return next(ApiError.badRequest('Failed to create user.'));
    }
});

const loginUser = asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;
    const { teamName } = req;

    //  CHECK VALUES FROM REQ.BODY
    if(!username || !password){
        return next(ApiError.badRequest('Please include all required fields.'));
    }

    if(!teamName){
        return next(ApiError.unauthorized('Unauthorized'))
    }

    //  CHECK USER EXISTS IN DB
    const user = await User.findOne({ username }).exec();

    if(!user){
        return next(ApiError.unauthorized('Wrong username or password.'));
    }

    //  CHECK PASSWORD MATCHES DB
    const match = bcrypt.compare(password, user.password);

    if(!match){
        return next(ApiError.unauthorized('Wrong username or password.'));
    }

    //  SEND ACCESS TOKEN
    const accessToken = jwt.sign({
        "UserInfo": {
            "username": user.username,
            "team": user.team
        }
    }, process.env.USER_ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
    );

    //  CREATE REFRESH TOKEN
    const refreshToken = jwt.sign(
        { "username": user.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
    );

    //  SET COOKIE ON RES HEADER WITH REFRESH TOKEN
    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ accessToken, username });

});

const refresh = asyncHandler(async (req, res, next) => {
    const cookies = req.cookies;
    if(!cookies?.jwt){
        return next(ApiError.unauthorized('Unauthorized'));
    }

    const refreshToken = cookies.jwt;

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async (error, decoded) => {
            console.log('error from refresh controller ', error)
            if(error){
                return next(ApiError.forbidden('Forbidden'))
            }
            const user = await User.findOne({ username: decoded.username });

            if(!user){
                return next(ApiError.unauthorized('Unauthorized'));
            }

            username = user.username;
            userTeam = user.team;

            const accessToken = jwt.sign(
                { 
                    "UserInfo": {
                        "username": user.username,
                        "team": user.team
                    }
                },
                process.env.USER_ACCESS_TOKEN_SECRET,
                { expiresIn: '20s' }
            );

            res.json({ accessToken, username: user.username, userTeam: user.team })
        })

    )
});

const logoutUser = asyncHandler(async (req, res) => {
    const cookies = req.cookies;

    if(!cookies?.jwt) return res.sendStatus(204);

    res.clearCookie('jwt', { 
        httpOnly: true,
        //secure: true, <---------------  UNCOMMENT IN DEPLOYMENT   <-----------------
        // sameSite: 'None'
     })
     res.json({ message: 'Cleared Cookie' });
});

const deleteUser = asyncHandler(async (req, res, next) => {
    const { teamId, username } = req;

    //  CHECK IF TEAM
    const team = await Team.findOne({_id: teamId});
    if(!team){
        return next(ApiError.internalError('Something wen\'t wrong'));
    }

    //  CHECK IF USER
    const user = await User.findOne({name: username, team: teamId });
    if(!user){
        return next(ApiError.badRequest('User does not exist'))
    }

    //  DELETE USER
    await User.deleteOne({name: username, team: teamId })

    //  DELETE TEAM MEMBER
    team.members.pull(user._id);
    team.save();

    res.json({user});
})



module.exports = {
    registerUser,
    loginUser,
    refresh,
    logoutUser,
    deleteUser
}