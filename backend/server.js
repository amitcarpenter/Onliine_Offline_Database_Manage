// server.js
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5000; // Change this to the desired port

// cors
app.use(cors());
app.use(express.json());

// let mongoDBUrl = 'mongodb://127.0.0.1:27017/mydatabase';
// let onlineDBUrl = 'mongodb+srv://ranarrdiscreet:RanarrDiscreetApp122@cluster0.20jjkz6.mongodb.net/?retryWrites=true&w=majority';


//
let localDBUrl1 = 'mongodb+srv://ranarrdiscreet:RanarrDiscreetApp122@cluster0.20jjkz6.mongodb.net/?retryWrites=true&w=majority';
let localDBUrl2 = 'mongodb://127.0.0.1:27017/mydatabase';


// let localDBUrl1 = 'mongodb://127.0.0.1:27017/mydatabase1';
// let localDBUrl2 = 'mongodb://127.0.0.1:27017/mydatabase2';



// Connect to your MongoDB database
mongoose.connect(localDBUrl2, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log(`Connected to MongoDB offline`);
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

//  db connect function getdata

var localDataforme;

async function getOfflineData() {
  if (online) {
    console.log(online, "online kddk")
    await mongoose.connect(localDBUrl2, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(() => { console.log("connected with local") })

    localDataforme = await FormData.find();
    await mongoose.connection.close()
    return localDataforme;
  }
  else {
    console.log("offline")





  }
}


// 


// Create a model based on the schema
const FormData = mongoose.model('FormData', formDataSchema);


var localDataforme;

// Middleware to parse JSON in request bodies
app.use(express.json());




app.get('', (req, res) => {
  res.send('from backend');
  getData()
});





// default User is Offline
let online = false



// online/offline status API
app.post('/api/user/online', async (req, res) => {
  // const { online } = req.body;

  online = true
  // mongoDBUrl = online ? 'mongodb+srv://ranarrdiscreet:RanarrDiscreetApp122@cluster0.20jjkz6.mongodb.net/?retryWrites=true&w=majority' : 'mongodb://127.0.0.1:27017/mydatabase';
  mongoDBUrl = online ? 'mongodb://127.0.0.1:27017/mydatabase1' : 'mongodb://127.0.0.1:27017/mydatabase2';
  console.log(`Connected to ${online ? 'online' : 'offline'} database`);


  console.log(online)
  if (online) {
    // await  syncData();
    await mongoose.connection.close()
    await mongoose.connect(localDBUrl1, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    await mongoose.connection.close()
  } else {

    // var localDataforme = await FormData.find()
    // console.log(localDataforme[1].slipno)


    // async function getData() {
    // localDataforme = await FormData.find();
    console.log("offline in api/user/online");

    // Loop through the array using a for loop
    // for (var i = 0; i < localDataforme.length; i++) {
    //   console.log("Element at index", i, ":", localDataforme[i]);
    // }
    // }





  }





  res.status(200).json({ message: `User online status updated, status is now ${online}` });
});



//route to handle the incoming data and save it to MongoDB
// app.post('/api/formdata', (req, res) => {
//   const formData = req.body;
//   const myFirstData = new FormData({
//     slipno: formData.formData.slipno,
//     vehno: formData.formData.vehno,
//     consignor: formData.formData.consignor,
//     charge: formData.formData.charge,
//     weight: formData.formData.weight,
//     type: formData.formData.type,
//     item: formData.formData.item,
//     datetime: formData.formData.datetime
//   });
//   myFirstData.save()
//     .then(() => {
//       res.status(200).json({ message: 'Data saved successfully' });
//     })
//     .catch((error) => {
//       res.status(500).json({ error: 'Error saving data' });
//     });
// });


app.post('/api/formdata', async (req, res) => {
  try {


    //  console.log(let isOnlineUser  ,"laskjdflaj" )

    const { slipno, vehno, consignor, charge, weight, type, item, datetime } = req.body
    // const formData = req.body;
    console.log(online, "kdkd")
    if (online) {
      const myFirstData = new FormData({
        // slipno: formData.formData.slipno,
        // vehno: formData.formData.vehno,
        // consignor: formData.formData.consignor,
        // charge: formData.formData.charge,
        // weight: formData.formData.weight,
        // type: formData.formData.type,
        // item: formData.formData.item,
        // datetime: formData.formData.datetime
        slipno, vehno, consignor, charge, weight, type, item, datetime
      });

      await myFirstData.save();
      console.log("data save to online")


      await mongoose.connection.close().then(() => {

        console.log("connection Closed")
      }).catch((error) => {
        console.log(error)
      })


      await mongoose.connect(localDBUrl2, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
        .then(() => {
          console.log('Connected to MongoDB With Offline');
        })
        .catch((error) => {
          console.error('Error connecting to MongoDB:', error);
        });

      const myFirstData1 = new FormData({
        // slipno: formData.formData.slipno,
        // vehno: formData.formData.vehno,
        // consignor: formData.formData.consignor,
        // charge: formData.formData.charge,
        // weight: formData.formData.weight,
        // type: formData.formData.type,
        // item: formData.formData.item,
        // datetime: formData.formData.datetime
        slipno, vehno, consignor, charge, weight, type, item, datetime
      });

      await myFirstData1.save();
      // await mongoose.connection.close().then(() => {

      //   console.log(" Offline connection Closed")
      // }).catch((error) => {
      //   console.log(error)
      // })

      res.status(200).json({ message: 'Data saved successfully' });

      console.log("online submit")
    }



    //for offline Form Submit
    if (!online) {
      // await mongoose.connect("mongodb://127.0.0.1:27017/mydatabase", {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
      // })
      //   .then(() => {
      //     console.log('Connected to MongoDB With Offline');
      //   })
      //   .catch((error) => {
      //     console.error('Error connecting to MongoDB:', error);
      //   });

      await FormData.create({
        // slipno: formData.formData.slipno,
        // vehno: formData.formData.vehno,
        // consignor: formData.formData.consignor,
        // charge: formData.formData.charge,
        // weight: formData.formData.weight,
        // type: formData.formData.type,
        // item: formData.formData.item,
        // datetime: formData.formData.datetime
        slipno, vehno, consignor, charge, weight, type, item, datetime


      })

      // await mongoose.connection.close().then(() => {

      //   console.log(" Offline connection Closed")
      // }).catch((error) => {
      //   console.log(error)
      // })

      res.status(200).json({ message: 'Data saved successfully' });

    }




  } catch (error) {
    res.status(500).json({ error: 'Error saving data' });
    console.log(error)
  }
});

// Fetch all data
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


// Update data by ID
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



// Fetch data from offline database and remove it
app.get('/api/fetchoffline', (req, res) => {
  FormData.find()
    .then((formData) => {
      // Send the offline data in the response
      res.status(200).json(formData);

      // Remove the offline data
      // FormData.deleteMany({})
      //   .then(() => {
      //     console.log('Offline data removed');
      //   })
      //   .catch((error) => {
      //     console.error('Error removing offline data:', error);
      //   });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error retrieving data' });
    });
});


// Send offline data to online database
app.post('/api/sendonline', async (req, res) => {
  try {
    // const offlineData = req.body;
    // console.log(offlineData)



    //   mongoose.connection.close()

    // await  mongoose.connect(localDBUrl2 , {
    //     useNewUrlParser : true ,
    //     useUnifiedTopology : true
    //   })

    //   const offlineData =  await FormData.find()

    //   console.log("test 2", offlineData[0].slipno);
    // await  mongoose.connection.close().then(()=>{
    //   console.log(" offline closed connecion")
    // })

    //   console.log("send Onlion")
    //   // console.log(offlineData);

    //   // console.log("test 1", offlineData[0].data.slipno);
    //   await  mongoose.connect(localDBUrl1 , {
    //     useNewUrlParser : true ,
    //     useUnifiedTopology : true
    //   })

    //   const onlineData =  await FormData.find()

    // await  mongoose.connection.close().then(()=>{
    //   console.log("online closed connecion")
    // })

    const offlineData = await getOfflineData();
    // await mongoose.connection.close()


    await mongoose.connect(localDBUrl1, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })


    // console.log(offlineData, "fllfl")


    const onlineDatafromDatabase = await FormData.find()
    // console.log("Data legth o", onlineDatafromDatabase.length)

    // async function saveDataToDatabase(offlineData, onlineDatafromDatabase) {
    //   for (let i = 0; i < offlineData.length; i++) {
    //     console.log(offlineData[i]);
    //     let slipnoFound = false;

    //     for (let j = 0; j < onlineDatafromDatabase.length; j++) {
    //       if (onlineDatafromDatabase[j].slipno === offlineData[i].slipno) {
    //         slipnoFound = true;
    //         break;
    //       }
    //     }

    //     if (!slipnoFound) {
    //       try {
    //         const newFormData = new FormData(offlineData[i]);
    //         await newFormData.validate(); // Apply Mongoose validation
    //         await newFormData.save();
    //       } catch (error) {
    //         console.error('Error saving data:', error);
    //         // Handle the error accordingly
    //       }
    //     }
    //   }
    // }

    // saveDataToDatabase(offlineData, onlineDatafromDatabase);

    for (let i = 0; i < offlineData.length; i++) {
      let isDuplicate = false;

      if (onlineDatafromDatabase.length == 0) {



        const slipno = offlineData[i].slipno;
        const vehno = offlineData[i].vehno;
        const consignor = offlineData[i].consignor;
        const charge = offlineData[i].charge;
        const type = offlineData[i].type;
        const weight = offlineData[i].weight;
        const item = offlineData[i].item;
        const datetime = offlineData[i].datetime;

        const savenewdata = await new FormData({
          slipno,
          vehno,
          consignor,
          charge,
          weight,
          type,
          item,
          datetime,
        });
          await savenewdata.validate();
          await savenewdata.save();
       
      //  break ; 
      continue ;

      }
      //  else {

        for (let j = 0; j < onlineDatafromDatabase.length; j++) {
          if (onlineDatafromDatabase[j].slipno === offlineData[i].slipno) {
            isDuplicate = true;
            console.log("Duplicate entry found:", offlineData[i]);
            break;
          }
        }

        if (!isDuplicate) {
          const slipno = offlineData[i].slipno;
          const vehno = offlineData[i].vehno;
          const consignor = offlineData[i].consignor;
          const charge = offlineData[i].charge;
          const type = offlineData[i].type;
          const weight = offlineData[i].weight;
          const item = offlineData[i].item;
          const datetime = offlineData[i].datetime;

          const savenewdata = await new FormData({
            slipno,
            vehno,
            consignor,
            charge,
            weight,
            type,
            item,
            datetime,
          });

          try {
            await savenewdata.validate();
            await savenewdata.save();
            console.log("Data saved:", savenewdata);
          } catch (error) {
            console.error("Error saving data:", error);
            // Handle the error accordingly
          }
        }
      // }
    }

    //     for (let i = 0; i < offlineData.length; i++) {
    //       // console.log(offlineData[i])

    //       for (let j = 0; j < onlineDatafromDatabase.length; j++) {
    //         console.log(onlineDatafromDatabase.length)
    //         if (onlineDatafromDatabase[j].slipno === offlineData[i].slipno) {
    //           console.log("if")
    // break ; 
    //         } else {
    //           console.log("else")
    //           const slipno = offlineData[i].slipno;
    //           const vehno = offlineData[i].vehno;
    //           const consignor = offlineData[i].consignor;
    //           const charge = offlineData[i].charge;
    //           const type = offlineData[i].type;
    //           const weight = offlineData[i].weight;
    //           const item = offlineData[i].item;
    //           const datetime = offlineData[i].datetime;
    //           const savenewdata = await new FormData({
    //             slipno,
    //             vehno,
    //             consignor,
    //             charge,
    //             weight,
    //             type,
    //             item,
    //             datetime,

    //           })
    //           await savenewdata.save()
    //           break ; 
    //         }
    //         console.log("bahar")
    //       }

    //     }










    // for (let i = 0; i < offlineData.length; i++) {
    //   console.log(offlineData[i]);
    //   let found = false;

    //   for (let j = 0; j < onlineDatafromDatabase.length; j++) {
    //     if (onlineDatafromDatabase[j].slipno === offlineData[i].slipno) {
    //       found = true;
    //       break;
    //     }
    //   }

    //   if (!found) {
    //     // Store the data in onlineDatabase
    //     await FormData.push(offlineData[i]);
    //   }
    // }



    // for (const data of offlineData) {


    //   try {
    //     const existingData = await FormData.findOne({ slipno: data.slipno });

    //     const onlineData = new FormData(data);
    //     await onlineData.save();
    //     console.log('New data saved:', onlineData);

    //   } catch (error) {
    //     console.error('Error querying or saving data:', error);
    //     return res.status(500).json({ error: 'Error querying or saving data' });
    //   }
    // }





    // await FormData.deleteMany({});
    console.log('Offline data synchronized');
    res.status(200).json({ message: 'Offline data synchronized' });
  } catch (error) {
    console.error('Error sending offline data:', error);
    res.status(500).json({ error: 'Error sending offline data' });
  }
});




// app.post('/api/sendonline', async (req, res) => {
//   const onlineData = req.body;
//   const dbUrl = onlineDBUrl;
//   console.log("api/sendOnline")

//   try {
//     await mongoose.connect(localDBUrl1, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     FormData.insertMany(onlineData)
//       .then(() => {
//         console.log('Offline data synced to online database');
//         res.status(200).json({ message: 'Offline data synced to online database' });
//       })
//       .catch((error) => {
//         console.error('Error syncing offline data:', error);
//         res.status(500).json({ error: 'Error syncing offline data' });
//       });
//   } catch (error) {
//     console.error('Error connecting to database:', error);
//     res.status(500).json({ error: 'Error connecting to database' });
//   }
// });









// Send Online data to offline database
app.post("/api/sendoffline", async (req, res) => {


  try {
    const onlineData = req.body;
    console.log(onlineData);

    for (const data of onlineData) {
      try {
        const existingData = await FormData.findOne({ slipno: data.slipno });


        const offlineData = new FormData(data);
        await offlineData.save();
        console.log('New data saved:', offlineData);

      } catch (error) {
        console.error('Error querying or saving data:', error);
        return res.status(500).json({ error: 'Error querying or saving data' });
      }
    }

    // await FormData.deleteMany({});
    // console.log('Offline data synchronized');
    res.status(200).json({ message: 'Online data synchronized' });
  } catch (error) {
    console.error('Error sending offline data:', error);
    res.status(500).json({ error: 'Error sending offline data' });
  }


})






// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
