const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNO: {
        type: String,
    },
    image: {
        type: String,
        default: null,
    },
    role: {
        type: String, // [student,allumni,teacher]
        default: null,
    },
    gender: {
        type: String, // [Male, Female]
    },

    createdAT: {
        type: Date,
        default: Date.now,
    },
});

const studentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    rollNo: {
        type: String,
    },
    year: {
        type: String,
    },
});
module.exports = mongoose.model('users', userSchema);