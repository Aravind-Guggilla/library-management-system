const { getDB } = require('../config/db');

const registerUser = async ({ name, email, hashedPassword }) => {
    const db = getDB();

    const query = `
        INSERT INTO users(name, email, password, role)
        VALUES($1, $2, $3, $4)
        RETURNING id
    `;

    const values = [name, email, hashedPassword, "member"];

    const result = await db.query(query, values);

    return result.rows[0];
};

const getUserByEmail = async (email) => {
    const db = getDB();

    const query = `
        SELECT *
        FROM users
        WHERE email = $1
    `;

    const result = await db.query(query, [email]);

    return result.rows[0];
};

module.exports = {
    registerUser,
    getUserByEmail
};