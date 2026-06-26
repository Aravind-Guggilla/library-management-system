const { getDB } = require("../config/db");

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

const getBorrowedBook = async (memberId, bookId) => {

    const db = getDB();

    const query = `
        SELECT *
        FROM borrow_records
        WHERE member_id = $1
        AND book_id = $2
        AND status = 'borrowed';
    `;

    const result = await db.query(query, [memberId, bookId]);

    return result.rows[0];

};

const borrowBook = async (memberId, bookId) => {

    const db = getDB();

    await db.query(
        `
        INSERT INTO borrow_records
        (member_id, book_id)
        VALUES ($1, $2)
        `,
        [memberId, bookId]
    );
};

const decreaseAvailableQuantity = async (id) => {
    const db = getDB();

    const query = `
        UPDATE books
        SET available_quantity = available_quantity - 1
        WHERE id = $1
    `;

    await db.query(query, [id]);
}

const returnBook = async (memberId, bookId) => {

    const db = getDB();

    const query = `
        UPDATE borrow_records
        SET
            status = 'returned',
            return_date = CURRENT_TIMESTAMP
        WHERE member_id = $1
        AND book_id = $2
        AND status = 'borrowed'
    `;

    await db.query(query, [memberId, bookId]);
};

const increaseAvailableQuantity = async (bookId) => {

    const db = getDB();

    const query = `
        UPDATE books
        SET available_quantity = available_quantity + 1
        WHERE id = $1
    `;

    await db.query(query, [bookId]);
};


module.exports = {
    getBookById,
    getBorrowedBook,
    borrowBook,
    decreaseAvailableQuantity,
    returnBook,
    increaseAvailableQuantity,
    getMyBorrowedBooks
};