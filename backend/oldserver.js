// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000; // Change this to the desired port


// cors
app.use(cors());
app.use(express.json());

let isUserOnline = false; 
let mongoDBUrl = '';

if (isUserOnline) {
  mongoDBUrl = 'mongodb+srv://ranarrdiscreet:RanarrDiscreetApp122@cluster0.20jjkz6.mongodb.net/?retryWrites=true&w=majority';
} else {
  mongoDBUrl = 'mongodb://127.0.0.1:27017/mydatabase';
}

// Connect to your MongoDB database
mongoose.connect(mongoDBUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {    
    if(isUserOnline){
      console.log('Connected to MongoDB online');
    }else{
      console.log('Connected to MongoDB offline');
    }
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Define a schema for your data
const formDataSchema = new mongoose.Schema({
  slipno: String,
  vehno: String,
  consignor: String,
  charge: String,
  weight: String,
  type: String,
  item: String,
  datetime: String,
});

// Create a model based on the schema
const FormData = mongoose.model('FormData', formDataSchema);

// Middleware to parse JSON in request bodies
app.use(express.json());

app.get('', (req, res) => {
  res.send('from backend')
})


// offline status api
app.post('/api/user/online', (req, res) => {
  const { online } = req.body;
  isUserOnline = online;
  console.log(`connected to ${isUserOnline}`);

  res.status(200).json({ message: `User online status updated, status is now ${isUserOnline} ` });
});

// Define a route to handle the incoming data and save it to MongoDB
app.post('/api/formdata', (req, res) => {
  const formData = req.body;
  console.log(formData);
  // Create a new document based on the FormData model
  const newFormData = new FormData(formData);

  // Save the document to the database
  newFormData.save()
    .then(() => {
      res.status(200).json({ message: 'Data saved successfully' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error saving data' });
    });
});

// offline 


// fetch all data
app.get('/api/fetchdata', (req, res) => {
  FormData.find()
    .then((formData) => {
      res.status(200).json(formData);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error retrieving data' });
    });
});


// Fetch data for a specific item based on ID
app.get('/api/items/:id', (req, res) => {
  const itemId = req.params.id;

  FormData.findById(itemId)
    .then((item) => {
      if (!item) {
        res.status(404).json({ error: 'Item not found' });
      } else {
        res.status(200).json(item);
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error retrieving item' });
    });
});
// update data by id
app.put('/api/items/:id', (req, res) => {
  const itemId = req.params.id;
  const updatedData = req.body;

  FormData.findByIdAndUpdate(itemId, updatedData, { new: true })
    .then((item) => {
      if (!item) {
        res.status(404).json({ error: 'Item not found' });
      } else {
        res.status(200).json({ message: 'Data updated successfully', item });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error updating data' });
    });
});
// Delete data by ID
app.delete('/api/items/:id', (req, res) => {
  const itemId = req.params.id;
  FormData.findByIdAndDelete(itemId)
    .then((item) => {
      if (!item) {
        res.status(404).json({ error: 'Item not found' });
      } else {
        res.status(200).json({ message: 'Data deleted successfully' });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error deleting data' });
    });
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
