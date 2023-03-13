const{Schema, model} = require('mongoose');

const commmentSchema = new Schema({
    comment: {
        type: String,
        required: [true, "Drop some notes"],
        trim: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
    },


}, {timestamps: true})

const commentModel = model('Comment', commmentSchema)
module.exports = commentModel;