const {constants} = require("../constants");

const errorHandeler = (error, request, response, next) => {
    const statusCode = response.statusCode ? response.statusCode : 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            response.json({
                title: "Validation Failed",
                message: error.message,
                stackTrace: error.stack
            });
            break;
        case constants.NOT_FOUND:
            response.json({
                title: "Not Found",
                message: error.message,
                stackTrace: error.stack   
            });
            case constants.UNAUTHORISED:
                response.json({
                    title: "UnAuthorised",
                    message: error.message,
                    stackTrace: error.stack   
                });  
            case constants.FORBIDDEN:
            response.json({
                title: "Forbidden",
                message: error.message,
                stackTrace: error.stack   
            }); 
            case constants.SERVER_ERROR:
            response.json({
                title: "Server Error",
                message: error.message,
                stackTrace: error.stack   
            });           
            default:
                console.log("No Error, All good !")
            break;
    }
};

module.exports = errorHandeler;