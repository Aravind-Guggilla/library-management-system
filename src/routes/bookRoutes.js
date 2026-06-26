const express = require("express");

const router = express.Router();

const authenticateToken = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");

const {createBook, getAllBooks} = require("../controllers/bookController");

router.post("/books/add", authenticateToken, authorizeRole("librarian"), createBook);
router.get("/books", authenticateToken, getAllBooks)

module.exports = router;