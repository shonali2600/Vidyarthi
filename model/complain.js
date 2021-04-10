const mongoose = require('mongoose');
const complainSchmea = new mongoose.Schema({
    content: {
        type: string,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    likes: {
        type: String,
    },
    timestamps: true,
});
const post = mongoose.model('complain', complainSchmea);
module.exports = post;