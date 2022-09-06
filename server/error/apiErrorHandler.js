const ApiError = require('./apiError');

function apiErrorHandler(error, req, res, next){
    console.error(error)

    if(error instanceof ApiError){
        res.status(error.code).json(error.message);
        return;
    }

    res.status(500).json('Something went wrong.')
}

module.exports = apiErrorHandler;