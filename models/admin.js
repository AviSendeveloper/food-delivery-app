const DB = require('../database');

const insertAdmin = async (name, username, password) => {
    const sql = "INSERT INTO admins (name, email, password, created_at, updated_at) VALUES (?, ?, ?, ?, ?)";
    const created_at = updated_at = new Date();

    const connection = await DB();
    return await connection.query(sql, [name, username, password, created_at, updated_at]);
}

const getUserByEmail = async (email) => {
    const sql = "SELECT * from admins WHERE email = ?";

    const connection = await DB();
    return await connection.query(sql, [email]);
}

const saveRefreshToken = async (userId, refreshToken) => {
    const sql = "UPDATE admins SET refresh_token = (?) WHERE id = (?)";
    const connection = await DB();
    return await connection.query(sql, [refreshToken, userId]);
}

module.exports = {
    insertAdmin,
    getUserByEmail,
    saveRefreshToken
}