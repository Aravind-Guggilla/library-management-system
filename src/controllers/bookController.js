const { addBook } = require("../services/bookService");

const createBook = async (request, response) => {

    try {

        const result = await addBook(request.body);

        response.status(201).json({
            message: "Book Added Successfully",
            bookId: result.id
        });

    } catch (error) {
        response.status(500).json({error: "Internal Server Error"});
    }

};

module.exports = {
    createBook
};