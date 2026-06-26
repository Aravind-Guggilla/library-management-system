const { getDB } = require("../config/db");

const getAllMembers = async () => {

    const db = getDB();

    const query = `
        SELECT
            id,
            name,
            email,
            role,
            created_at
        FROM users
        WHERE role = 'member'
        ORDER BY id;
    `;

    const result = await db.query(query);

    return result.rows;
};

const getMemberById = async (id) => {

    const db = getDB();

    const query = `
        SELECT *
        FROM users
        WHERE id = $1
        AND role = 'member';
    `;

    const result = await db.query(query, [id]);

    return result.rows[0];
};

const deleteMember = async (id) => {

    const db = getDB();

    const query = `
        DELETE FROM users
        WHERE id = $1;
    `;

    await db.query(query, [id]);
};

module.exports = {
    getAllMembers,
    getMemberById,
    deleteMember
};