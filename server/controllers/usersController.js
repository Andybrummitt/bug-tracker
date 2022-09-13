const ApiError = require("../error/apiError");
const bcrypt = require('bcrypt');
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');
const Team = require("../models/Team");

//  Register User
//  POST /api/auth/user/register
const registerUser = asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;
    const { teamName } = req;

    //  CHECK VALUES FROM REQ.BODY
    if(!username || !password){
        return next(ApiError.badRequest('Please include all required fields.'));
    }

    //  CHECK FOR DUPLICATES
    const duplicate = await User.findOne({ username }).lean().exec();

    if(duplicate){
        return next(ApiError.conflict('A User with that name already exists.'));
    }

    //  HASH PASSWORD
    const saltRounds = 10;
    const hashedPass = await bcrypt.hash(password, saltRounds);

    const team = await Team.findOne({name: teamName});

    //  CREATE USER AND STORE IN DB
    const userObj = { username, team: team._id, password: hashedPass };

    const user = await User.create(userObj);

    if(user){
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

    //  CHECK TEAM EXISTS IN DB
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
        { expiresIn: '20s' }
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
        //secure: true, <---------------  UNCOMMENT IN DEPLOYMENT   <-----------------
        // sameSite: 'None',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ accessToken, username });

});

const refresh = (req, res, next) => {
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
};

const logoutUser = (req, res) => {
    const cookies = req.cookies;

    if(!cookies?.jwt) return res.sendStatus(204);

    res.clearCookie('jwt', { 
        httpOnly: true,
        //secure: true, <---------------  UNCOMMENT IN DEPLOYMENT   <-----------------
        // sameSite: 'None'
     })
     res.json({ message: 'Cleared Cookie' });
}

module.exports = {
    registerUser,
    loginUser,
    refresh,
    logoutUser
}