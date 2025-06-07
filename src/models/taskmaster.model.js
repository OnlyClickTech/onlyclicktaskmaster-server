const mongoose = require('mongoose');
const { category } = require('../utils/constants');

const taskmasterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  masterId: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /\d{10}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  homeAddress: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: category,
    default: null,
  },
  status: {
    type: String,
    enum: ['in-task', 'free'],
    default: 'free'
  },
  coordinates: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
      validate: {
        validator: arr => arr.length === 2 && arr.every(Number.isFinite),
        message: 'Latitude and longitude are required and must be numbers'
      }
    }
  }
});

taskmasterSchema.index({ coordinates: '2dsphere' });

const Taskmaster = mongoose.model('Taskmaster', taskmasterSchema);
module.exports = Taskmaster;
