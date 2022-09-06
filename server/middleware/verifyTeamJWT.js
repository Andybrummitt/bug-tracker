const jwt = require('jsonwebtoken');
const ApiError = require('../error/apiError');

const verifyTeamJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if(!authHeader?.startsWith('Bearer ')){
        return next(ApiError.unauthorized('Unauthorized.'));
    }


    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.TEAM_ACCESS_TOKEN_SECRET,
        (error, decoded) => {
            if(error){
                return next(ApiError.forbidden('Forbidden.'));
            }
            req.teamName = decoded.TeamName;
            next();
        }
    )

}

module.exports = verifyTeamJWT;