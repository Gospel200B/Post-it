// const { string } = require('joi');
const {Schema, model} = require ('mongoose');
const validator = require('validator');
const userSchema = new Schema({
    userName : {
        type : String,
        required : true,
        unique: true,
        trim: true
    },
    email : {
        type : String,
        required : [true, "Email must be inputed"],
        unique: true,
        trim: true,
        validate : [
            validator.isEmail, 
            "Please enter a valid email"
        ]
    },
    password : {
        type: String,
        required: true,
        trim: true,
        minimum: 8,
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please confirm your password"],
        validate: {
            validator: function(el) {
                return el === this.password;
            },
            message: "Passwords do not match"
        }
    },

    passwordResetAt: Date,
    passwordTokenReset : String,
    passwordResetTokenExpires: Date,
    active:{
        type: boolean,
        default: true,
        select : false
    },

},
{
    toJson: {virtuals: true},
    toObject: {virtuals: true}
},
{timestamps : true});

const userModel= model('User', userSchema);
module.exports = userModel;