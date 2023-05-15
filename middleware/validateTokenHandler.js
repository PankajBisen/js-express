const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateToken = asyncHandler(async (request, response,next) => {
    let token;
    let authHeader = request.headers.Authorization || request.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.ACCCES_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                response.status(401);
                throw new Error('User is not authorised');
            }
            request.user = decoded.user;
            next();
        });
        if(!token){
            response.status(401);
            throw new Error('User is not authorised or token is missing');
        }
    }
});

module.exports = validateToken;