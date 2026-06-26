const { addBook, getBookByISBN, allBooks } = require("../services/bookService");

const createBook = async (request, response) => {

    try {
        const {isbn} = request.body
        const book = await getBookByISBN(isbn)
        if(book !== undefined){
            return response.status(400).json({error: "Book already exists"})
        }


        const result = await addBook(request.body);

        response.status(201).json({
            message: "Book Added Successfully",
            bookId: result.id
        });

    } catch (error) {
        response.status(500).json({error: "Internal Server Error"});
    }

};

const getAllBooks = async (request, response) => {
    try{
        const books = await allBooks()
        response.status(200).json(books)
    }catch(error){
        response.status(500).json({error: "Internal Server Error"});
    }
    
}

module.exports = {
    createBook,
    getAllBooks
};