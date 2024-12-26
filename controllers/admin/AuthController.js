const { insertAdmin, getUserByEmail, saveRefreshToken } = require('../../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { name, username, password } = req.body;

    // encrypt password
    const encryptedPassword = await bcrypt.hash(password, 10);
    
    await insertAdmin(name, username, encryptedPassword);

    return res.status(201).json({
        status: true,
        message: 'Admin created successfully'
    });
}

const login = async (req, res) => {
    const {email, password} = req.body;

    const user = await getUserByEmail(email);

    // check user
    if (!user.length) {
        return res.status(401).json({
            status: false,
            message: 'Invalid email or password'
        });
    }

    // check password
    if (!await bcrypt.compare(password, user[0][0].password)) {
        return res.status(401).json({
            status: false,
            message: 'Invalid email or password'
        });
    }

    // generate token
    const {accessToken, refreshToken} = await generateToken(user[0][0].id);

    return res.status(200)
    .cookie('accessToken', accessToken, { maxAge: 900000, httpOnly: true })
    .cookie('refreshToken', refreshToken, { maxAge: 900000, httpOnly: true })
    .json({
        status: true,
        accessToken,
        refreshToken
    });
}

const generateToken = async (userId) => {
    // generate access token
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });

    // save refresh token to database
    await saveRefreshToken(userId, refreshToken);
    return {accessToken, refreshToken};
}

module.exports = { register, login };