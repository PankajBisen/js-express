const asyncHandler = require('express-async-handler')
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { use } = require('../routes/userRoutes');

const registerUser = asyncHandler(async (requiest, response) => {
    const { username, email, password } = requiest.body;
    if (!username || !email || !password) {
        response.status(400)
        throw new Error('All fields are mandetory!')
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        response.status(400);
        throw new Error('User already register !')
    }
    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log('Hashed Password ', hashedPassword);
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });

    console.log(`User created ${user}`);
    if (user) {
        response.status(201).json({ _id: user.id, email: user.email });
    } else {
        response.status(400);
        throw new Error('User data is not valid');
    }
    response.json({ message: " Register the User" });
});

const loginUser = asyncHandler(async (request, response) => {
    const { email, password } = request.body;
    if (!email, !password) {
        response.status(400);
        throw new Error('All fiels are Mandetory !')
    }
    const user = await User.findOne({ email });
    //Compare password with hashes Password
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id
                }
            },
            process.env.ACCCES_TOKEN_SECRET,
            { expiresIn: '15m' }
        );
        response.status(200).json({ accessToken })
    } else {
        response.status(401);
        throw new Error('Email or Password Not valid')
    }
});

const currentUser = asyncHandler(async (request, response) => {
    response.json(request.user);
})

module.exports = {
    registerUser,
    loginUser,
    currentUser
};