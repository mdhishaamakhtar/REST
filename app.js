const express=require('express');
const app=express();
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');
require('dotenv/config');


const postRoute=require('./routes/post.js');
app.use(cors());
app.use(bodyParser.json());
app.use("/posts",postRoute);
app.get("/",(req,res)=>{
  res.send("We are on home. Go to /posts to see the data");
});
mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true },()=>{console.log("Connected to DB")});

app.listen(3000);
