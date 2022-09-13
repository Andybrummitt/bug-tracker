const jwt = require('jsonwebtoken');
const ApiError = require('../error/apiError');

const verifyUserJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if(!authHeader?.startsWith('Bearer ')){
        return next(ApiError.unauthorized('Unauthorized.'));
    }
    console.log('Verifying user jwt')

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.USER_ACCESS_TOKEN_SECRET,
        (error, decoded) => {
            console.log(error)
            if(error){
                return next(ApiError.forbidden('Forbidden.'));
            }
            req.teamId = decoded.UserInfo.team;
            req.username = decoded.UserInfo.username;
            next();
        }
    )

}

module.exports = verifyUserJWT;