const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
// const apiLimiter = require('./middlewares/rateLimiter');

dotenv.config();
require('dotenv').config();

const app = express();
app.use(express.json());

const taskmasterRoutes = require('./src/routes/taskmaster.routes');
const jobRoutes = require('./src/routes/job.routes');
const reviewRoutes = require('./src/routes/review.routes');
app.use('/api/taskmaster', taskmasterRoutes);
app.use('/api/job', jobRoutes);
app.use('/api/review', reviewRoutes);


module.exports = app;