const userService = require("../services/user.service");
const UserController = require("./user.controller");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

//handle error
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "", userName: "", passwordConfirm: "" };

  //validation errors
  if (err._message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties] = properties;
    });
  }

  return errors;
};



module.exports.signup_post = async (req, res) => {
  
  try{
    const { email, password, userName, passwordConfirm } = req.body;
  console.log(req.body);
    const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    res.status(400).json({ error: "User already exists" });
  }
  const newUser = await userModel.create({
    email: req.body.email,
    password: req.body.password,
    userName: req.body.userName,
    passwordConfirm: req.body.passwordConfirm,
  });
  res.status(200).send(newUser);

  }
  catch(err){
    
    console.log(err)
  }

};

module.exports.login_post = (req, res) => {
  const { email, password } = req.body;
  try {
    const user = user.login({ email: email, password: password });
    res.status(200).send({ user: user_id });
  } catch (err) {
    const error = handleErrors(err);
    res.status(400).json({});
    handleErrors(err);
  }
};
