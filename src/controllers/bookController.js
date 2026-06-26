const { addBook, getBookByISBN, getAllBooks, getBookById } = require("../services/bookService");

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

const fetchAllBooks = async (request, response) => {
    try{
        const books = await getAllBooks()
        response.status(200).json(books)
    }catch(error){
        response.status(500).json({error: "Internal Server Error"});
    }
    
}

const fetchBookById = async (request, response) =>{

    try {

        const { id } = request.params;

        const book = await getBookById(id);

        if (book === undefined) {
            return response.status(404).json({error: "Book not found"});
        }

        response.status(200).json(book);

    } catch (error) {
        response.status(500).json({error: "Internal Server Error"});
    }
}

module.exports = {
    createBook,
    fetchAllBooks,
    fetchBookById
};