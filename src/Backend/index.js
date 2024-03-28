/* eslint-disable no-undef */
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken")
// const nodemailer = require("nodemailer");
// const bcrypt = require("bcryptjs")
const app = express();
const port = 5000;
const mongo_url =
  "mongodb+srv://utuyashprajapati:EvuYitdZJej8VFN6@cluster0.yfiztjd.mongodb.net/Quoty";
app.use(cors());
app.use(express.json());
mongoose.connect(mongo_url);
const db = mongoose.connection;
db.on("error", (err) => {
  console.log("Mongodb Connection Error", err);
});
db.once("open", () => {
  console.log("Mongodb is Connected");
});

const Users = mongoose.model('Users', {
  username: {
      type: String,
  },
  email: {
      type: String,
      Unique: true,
  },
  password: {
      type: String,
  },

  date: {
      type: Date,
      default: Date.now,
  }
});


app.post('/registration', async (req, res) => {

  let check = await Users.findOne({ email: req.body.email });
  if (check) {
      return res.status(400).json({ success: false, erroes: "Existing User Found with same email id." })
  }

  const user = new Users({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password ,
  })
  await user.save();
  const data = {
      user: {
          id: user.id
      }
  }
  const token = jwt.sign(data, 'secret_ags')
  res.json({ success: true, token })
});


app.post('/login', async (req,res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
      const passComapre = req.body.password === user.password;
      if (passComapre) {
          const data = {
              user: {
                  id:user.id
              }
          }
          const token = jwt.sign(data, 'secret_ags');
          res.json({ success: true, token })
      }
      else {
          res.json({ success: false, errors: "wrong Password" })
      }
  }else{
      res.json({success:false,errors:"Wrong Email Id"})
  }
})

app.get('/userdata/:id' , async (req,res)=>{
    try{
        const userid=req.params.id;
        const user = Users.findById(userid);
        res.json(user)
    }
    catch (err){
        console.log(err);
        res.status.json({   message : "Server Error" })
    }
})


app.listen(port);
