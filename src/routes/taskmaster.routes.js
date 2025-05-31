const express = require("express");
const {
    createTaskmaster,
    getAllTaskmasters,
    getTaskmasterById,
    updateTaskmaster,
    deleteTaskmaster
} = require("../controllers/taskmaster.controller");

const router = express.Router();

// Create a new taskmaster
router.post("/", createTaskmaster);

// Get all taskmasters
router.get("/", getAllTaskmasters);

// Get a single taskmaster by ID
router.get("/:id", getTaskmasterById);

// Update a taskmaster
router.put("/:id", updateTaskmaster);

// Delete a taskmaster
router.delete("/:id", deleteTaskmaster);

module.exports = router;