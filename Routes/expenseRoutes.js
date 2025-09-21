const express = require("express");
const router = express.Router();
const {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense
} = require("../Controller/expenseController");

const { verifyToken } = require("../Middleware/authMiddleware");

// All routes are protected
router.post("/", verifyToken, addExpense);
router.get("/", verifyToken, getExpenses);
router.put("/:id", verifyToken, updateExpense);
router.delete("/:id", verifyToken, deleteExpense);

module.exports = router;
