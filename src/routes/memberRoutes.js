const express = require("express");

const router = express.Router();

const authenticateToken = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");

const {fetchMembers, removeMember} = require("../controllers/memberController");

router.get("/", authenticateToken, authorizeRole("librarian"), fetchMembers);

router.delete("/:id", authenticateToken, authorizeRole("librarian"), removeMember);

module.exports = router;