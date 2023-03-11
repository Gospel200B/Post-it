const userService = require('../services/user.service')
const UserController = require('./user.controller')
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');


//handle error
const handleErrors = () => {
    console.log(err.message, err.code);
    let errors = {email: '', password: ''};

    // validation errors
    if(errors.message.includes('user validation failed')) {
        Object.values(err.erros).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        })
    }

    return errors;
}



module.exports.signup_get = (req, res) => {
    res.render('Signup')
}

module.exports.login_get = (req, res) => {
    res.render('login')
}

module.exports.signup_post= async  (req, res) => {
    const {email, password} = req.body;

    try{
        const user = await userService.createUser({email: email, password: password});
        res.status(200).send(user);
    }
    catch(err){
        const error = handleErrors(err);
        res.status(400).json({error})
        handleErrors(err);
    }
}

module.exports.login_post = (req, res) => {
    const {email, password} = req.body;
    try{
        const user = user.login({email: email, password: password});
        res.status(200).send({user : user_id});
    }
    catch(err){
        const error = handleErrors(err);
        res.status(400).json({})
        handleErrors(err);
    }
}