const {
    getBorrowedBook, 
    borrowBook, 
    decreaseAvailableQuantity, 
    // getBookById, 
    returnBook, 
    increaseAvailableQuantity,
    getMyBorrowedBooks
} = require("../services/borrowService")

const { getBookById } = require("../services/bookService");

const borrow = async (request, response) => {

    try {

        const memberId = request.user.userId;

        const { id } = request.params;

        const book = await getBookById(id);

        if (book === undefined) {
            return response.status(404).json({
                error: "Book not found"
            });
        }

        if (book.available_quantity <= 0) {
            return response.status(400).json({
                error: "Book unavailable"
            });
        }

        const alreadyBorrowed = await getBorrowedBook(memberId, id);

        if (alreadyBorrowed !== undefined) {
            return response.status(400).json({
                error: "Book already borrowed"
            });
        }

        await borrowBook(memberId, id);
        await decreaseAvailableQuantity(id);

        response.status(200).json({message: "Book Borrowed Successfully"});

    } catch (error) {
        response.status(500).json({error: "Internal Server Error"});
    }

};

const returnBorrowedBook = async (request, response) => {

    try {

        const memberId = request.user.userId;

        const { id } = request.params;

        const book = await getBookById(id);

        if (book === undefined) {
            return response.status(404).json({
                error: "Book not found"
            });
        }

        const borrowedBook = await getBorrowedBook(memberId, id);

        if (borrowedBook === undefined) {
            return response.status(400).json({
                error: "Book is not borrowed"
            });
        }

        await returnBook(memberId, id);

        await increaseAvailableQuantity(id);

        response.status(200).json({message: "Book Returned Successfully"});

    } catch (error) {
        response.status(500).json({error: "Internal Server Error"});
    }

};

const fetchMyBorrowedBooks = async (request, response) => {

    try {

        const memberId = request.user.userId;

        const books = await getMyBorrowedBooks(memberId);

        response.status(200).json(books);

    } catch (error) {
        response.status(500).json({error: "Internal Server Error"});
    }

};

module.exports = {
    borrow,
    returnBorrowedBook,
    fetchMyBorrowedBooks
};