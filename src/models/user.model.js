const {Schema, model} = require ('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
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
        lowercase: true,
        validate : [
            validator.isEmail, 
            "Please enter a valid email"
        ]
    },
    password : {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
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
        type: Boolean,
        default: true,
        select : false
    },

},
{
    toJson: {virtuals: true},
    toObject: {virtuals: true}
},

// fire a function b4 doc is saved 
userSchema.pre('save', async function (next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next();
}),

//static method to login user
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({email});
    if (!user) {
        throw new Error('Invalid email or password');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid email or password');
    }
    return user;
},

{timestamps : true});

const userModel= model('User', userSchema);
module.exports = userModel;