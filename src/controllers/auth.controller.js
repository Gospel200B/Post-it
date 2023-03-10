const UserController = require('./user.controller')

module.exports.signup_get = (req, res) => {
    res.render('Signup')
}

module.exports.login_get = (req, res) => {
    res.render('login')
}

module.exports.signup_post= (req, res) => {
    res.send('New user created')
}

module.exports.login_post = (req, res) => {
    res.rsend('User logged in')
}