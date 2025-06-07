const Taskmaster = require("../models/taskmaster.model.js");
const { category: validCategories } = require('../utils/constants');

const createTaskmaster = async (req, res) => {
    try {
      const { name, phoneNumber, homeAddress, masterId, category, status, coordinates } = req.body;
  
      if (!validCategories.includes(category)) {
        return res.status(400).json({ error: "Invalid category" });
      }
  
      // Validate coordinates
      if (
        !coordinates ||
        coordinates.type !== 'Point' ||
        !Array.isArray(coordinates.coordinates) ||
        coordinates.coordinates.length !== 2 ||
        typeof coordinates.coordinates[0] !== 'number' ||
        typeof coordinates.coordinates[1] !== 'number'
      ) {
        return res.status(400).json({ error: "Latitude and longitude are required and must be numbers" });
      }
  
      const newTaskmaster = new Taskmaster({
        name,
        phoneNumber,
        homeAddress,
        masterId,
        category,
        status: status || 'free',
        coordinates
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

const getNearbyTaskmasters = async (req, res) => {
    try {
      const { lat, lng, category } = req.query;
  
      if (!lat || !lng || !category) {
        return res.status(400).json({ error: "lat, lng, and category are required" });
      }
  
      const taskmasters = await Taskmaster.find({
        category,
        status: 'free',
        coordinates: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [parseFloat(lng), parseFloat(lat)]
            },
            $maxDistance: 10000 // 10 kilometers
          }
        }
      });
  
      res.status(200).json(taskmasters);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };
  

module.exports = {
    createTaskmaster,
    getAllTaskmasters,
    getTaskmasterById,
    updateTaskmaster,
    deleteTaskmaster,
    getNearbyTaskmasters
};