const Job = require('../models/job.model');
const Taskmaster = require('../models/taskmaster.model');

// Create a job
const createJob = async (req, res) => {
    
    try {
        const { taskmasterId, bookingId, bookingDate, category, subcategory, price, status } = req.body;
        const newJob = new Job({ taskmasterId, bookingId, bookingDate, category, subcategory, status, price });
        const savedJob = await newJob.save();
        res.status(201).json(savedJob);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all jobs for a taskmaster
const getJobsForTaskmaster = async (req, res) => {
    try {
        const jobs = await Job.find({ taskmasterId: req.params.taskmasterId });
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get job stats for a taskmaster
const getJobStats = async (req, res) => {
    try {
        const { taskmasterId } = req.params;
        const now = new Date();

        const getRange = (days) => {
            const from = new Date(now);
            from.setDate(now.getDate() - days);
            return from;
        };

        const jobs = await Job.find({ taskmasterId });

        const calc = (fromDate) => {
            const filtered = jobs.filter(job => new Date(job.bookingDate) >= fromDate);
            const earnings = filtered.reduce((acc, job) => acc + job.price, 0);
            return { count: filtered.length, earnings };
        };

        res.status(200).json({
            week: calc(getRange(7)),
            month: calc(getRange(30)),
            year: calc(getRange(365))
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getEarningsByTaskmaster = async (req, res) => {
    try {
        const { taskmasterId } = req.params;

        const total = await Job.aggregate([
            {
                $match: {
                    taskmasterId: taskmasterId,
                    status: "completed"
                }
            },
            {
                $group: {
                    _id: null,
                    totalEarnings: { $sum: "$price" }
                }
            }
        ]);

        const earnings = total[0]?.totalEarnings || 0;
        res.status(200).json({ totalEarnings: earnings });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createJob,
    getJobsForTaskmaster,
    getJobStats,
    getEarningsByTaskmaster
};
