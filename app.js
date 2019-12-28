const express=require('express');
const app=express();
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');
require('dotenv/config');
const postRoute=require('./routes/post.js');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true});

mongoose.connection.once('connected', () => {
  console.log('connected');
}).on('error', () => {
  console.log('error connecting to DB');
});


app.use("/posts", postRoute);

app.listen(3000, () => {
	console.log("Listening....")
});
