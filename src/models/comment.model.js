const{Schema, model} = require('mongoose');
// const postModel =require('../models/post.model');

const commmentSchema = new Schema({
    comment: {
        type: String,
        required: [true, "Drop some notes"],
        trim: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true 
    },


}, {timestamps: true})

const commentModel = model('Comment', commmentSchema)
module.exports = commentModel;