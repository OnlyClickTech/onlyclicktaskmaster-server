const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
// const apiLimiter = require('./middlewares/rateLimiter');

dotenv.config();
require('dotenv').config();

const app = express();
app.use(express.json());

const taskmasterRoutes = require('./src/routes/taskmaster.routes');
app.use('/api/taskmaster', taskmasterRoutes);

module.exports = app;