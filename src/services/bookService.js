const { getDB } = require("../config/db");

const getBookByISBN = async (isbn) => {
    const db = getDB();

    const query = `
        SELECT *
        FROM books
        WHERE isbn = $1
    `;

    const result = await db.query(query, [isbn]);

    return result.rows[0];
};

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

const getAllBooks = async () => {

    const db = getDB();

    const query = `
        SELECT 
           *
        FROM 
            books
        ORDER BY id;
    `;

    const result = await db.query(query);

    return result.rows;
};

const getBookById = async (id) => {

    const db = getDB();

    const query = `
        SELECT *
        FROM books
        WHERE id = $1
    `;

    const result = await db.query(query, [id]);

    return result.rows[0];
};

const updateBook = async (id, bookDetails) => {

    const db = getDB();

    const {title, author, isbn, category, quantity} = bookDetails;

    const existingBook = await getBookById(id);
    

    const borrowedBooks = existingBook.quantity - existingBook.available_quantity;

    const availableQuantity = quantity - borrowedBooks;

    const query = `
        UPDATE books
        SET
            title = $1,
            author = $2,
            isbn = $3,
            category = $4,
            quantity = $5,
            available_quantity = $6
        WHERE id = $7
    `;

    const values = [title, author, isbn, category, quantity, availableQuantity, id];

    await db.query(query, values);
};

const deleteBook = async (id) => {

    const db = getDB();

    const query = `
        DELETE FROM books
        WHERE id = $1
    `;

    await db.query(query, [id]);

};

module.exports = {
    addBook,
    getBookByISBN,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook
};