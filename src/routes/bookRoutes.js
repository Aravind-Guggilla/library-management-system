const express = require("express");

const router = express.Router();

const authenticateToken = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");

const {createBook} = require("../controllers/bookController");

router.post("/add", authenticateToken, authorizeRole("librarian"), createBook);

module.exports = router;