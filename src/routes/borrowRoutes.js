const express = require("express");

const router = express.Router();

const authenticateToken = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");

const {borrow, returnBorrowedBook, fetchMyBorrowedBooks} = require("../controllers/borrowController");

router.post("/:id/borrow", authenticateToken, borrow);
router.post("/:id/return", authenticateToken, returnBorrowedBook);
router.get("/my/books", authenticateToken, authorizeRole("member"), fetchMyBorrowedBooks);

module.exports = router;