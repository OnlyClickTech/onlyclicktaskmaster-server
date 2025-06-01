const express = require('express');
const {
    createJob,
    getJobsForTaskmaster,
    getJobStats,
    getEarningsByTaskmaster
} = require('../controllers/job.controller');

const router = express.Router();

router.post('/', createJob);
router.get('/taskmaster/:taskmasterId', getJobsForTaskmaster);
router.get('/taskmaster/:taskmasterId/stats', getJobStats);
router.get('/earnings/:taskmasterId', getEarningsByTaskmaster);

module.exports = router;
