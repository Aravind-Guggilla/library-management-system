const { getDB } = require("../config/db");

const addBook = async (bookDetails) => {
    const db = getDB();

    const {
        title,
        author,
        isbn,
        category,
        quantity,
        availableQuantity
    } = bookDetails;

    const query = `
        INSERT INTO books
        (title, author, isbn, category, quantity, available_quantity)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id
    `;

    const values = [
        title,
        author,
        isbn,
        category,
        quantity,
        availableQuantity
    ];

    const result = await db.query(query, values);

    return result.rows[0];
};

module.exports = {
    addBook
};