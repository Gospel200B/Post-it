const express = require("express");
const mongoose = require("mongoose");
const app = express();
const router = require("./src/routes/index.routes");
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1", router);
const MONGODB_URI =
  "mongodb+srv://Ugochukwu:gospel123@cluster0.l6lajtd.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to our MongoDb database!");
  })
  .catch((err) => {
    console.log(err);
  });


  //Random avatar generation
  app.post('/api/v1/auth/signup', (req, res) => {
    let {userName} = req.body;
    let avater = `https://api.dicebear.com/5.x/micah/${userName}/svg`
    return res.json({avater})
  })

const port = process.env.PORT || 5500;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
