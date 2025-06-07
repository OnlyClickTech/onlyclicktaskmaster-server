const express = require("express");
const {
    createTaskmaster,
    getAllTaskmasters,
    getTaskmasterById,
    updateTaskmaster,
    deleteTaskmaster,
    getNearbyTaskmasters
} = require("../controllers/taskmaster.controller");

const router = express.Router();

router.post("/", createTaskmaster);
router.get("/", getAllTaskmasters);
router.get("/nearby", getNearbyTaskmasters);
router.get("/:id", getTaskmasterById);
router.put("/:id", updateTaskmaster);
router.delete("/:id", deleteTaskmaster);

module.exports = router;