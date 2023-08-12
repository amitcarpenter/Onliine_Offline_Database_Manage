const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/mydata';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Your code logic goes here
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

  const myschema = new mongoose.Schema({
    name:String,
    price:Number,
    des:String
  });

  const myData = new mongoose.model("mydata", myschema);

  const myFirstData = new myData({
    name:"Rana RR",
    price:45,
    des:"Simple 2"
  });
  myFirstData.save();