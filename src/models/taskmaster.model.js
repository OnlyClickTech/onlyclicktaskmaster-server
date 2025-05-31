const mongoose = require('mongoose');
const { category } = require('../utils/constants');

const taskmasterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function(v) {
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
    category : {
        type: String,
        required: true,
        enum : category,
        default: null,
        // validate: {
        //     validator: function(v) {
        //         return category.map(c => c.toLowerCase()).includes(v.toLowerCase());
        //     },
        //     message: props => `${props.value} is not a valid category!`
        // }
    },
    status: {
        type: String,
        enum: [ 'in-task', 'free'],
        default: 'free'
    },
    });

const Taskmaster = mongoose.model('Taskmaster', taskmasterSchema);
module.exports = Taskmaster;