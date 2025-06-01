const Taskmaster = require("../models/taskmaster.model.js");
const { category: validCategories } = require('../utils/constants');

const createTaskmaster = async (req, res) => {
    try {
        const { name, phoneNumber, homeAddress, masterId, category, status } = req.body;

        if (!validCategories.includes(category)) {
            return res.status(400).json({ error: "Invalid category" });
        }

        const newTaskmaster = new Taskmaster({
            name,
            phoneNumber,
            homeAddress,
            masterId,
            category,
            status: status || 'free'
        });

        const savedTaskmaster = await newTaskmaster.save();
        res.status(201).json(savedTaskmaster);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const getAllTaskmasters = async (req, res) => {
    try {
        const { category, status } = req.query;
        let filter = {};
        
        if (category) filter.category = category;
        if (status) filter.status = status;

        const taskmasters = await Taskmaster.find(filter).populate('masterId', '-password');
        res.status(200).json(taskmasters);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTaskmasterById = async (req, res) => {
    try {
        const taskmaster = await Taskmaster.findById(req.params.id).populate('masterId', '-password');
        
        if (!taskmaster) {
            return res.status(404).json({ error: "Taskmaster not found" });
        }
        
        res.status(200).json(taskmaster);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateTaskmaster = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body; 

        const updatedTaskmaster = await Taskmaster.findByIdAndUpdate(
            id,
            updates,
            { new: true, runValidators: true }
        ).populate('masterId', '-password');

        if (!updatedTaskmaster) {
            return res.status(404).json({ error: "Taskmaster not found" });
        }

        res.status(200).json(updatedTaskmaster);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteTaskmaster = async (req, res) => {
    try {
        const deletedTaskmaster = await Taskmaster.findByIdAndDelete(req.params.id);
        
        if (!deletedTaskmaster) {
            return res.status(404).json({ error: "Taskmaster not found" });
        }
        
        res.status(200).json({ message: "Taskmaster deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createTaskmaster,
    getAllTaskmasters,
    getTaskmasterById,
    updateTaskmaster,
    deleteTaskmaster
};