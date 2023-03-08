const {Schema, model} = require('mongoose');
// const userModel = require('../models/user.model');

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamp: true});

const postModel = model('Post', postSchema);
module.exports = postModel;