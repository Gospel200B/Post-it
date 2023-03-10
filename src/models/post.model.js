const {Schema, model} = require('mongoose');
// const userModel = require('../models/user.model');

const postSchema = new Schema({
    title: {
        type: String,
        required: [true, "Input a title"],
        minlength: 3
    },
    body: {
        type: String,
        required: [true, "Add a body"],
        minlength: 10
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamp: true});

const postModel = model('Post', postSchema);
module.exports = postModel;