import logo from './logo.svg';
import './App.css';
import Truck1 from "./img/truck1.png";
import Truck2 from "./img/truck2.png";
import { useEffect, useState } from 'react';
import { Router, Routes, Route } from 'react-router-dom'
import axios from 'axios';
import Home from './Home';
import View from './View';
import Update from './Update';

function App() {

  // setting the status of online/offline in backend
  const [isOnline, setIsOnline] = useState(window.navigator.onLine); 

  useEffect(() => {
    updateOnlineStatus();
  }, [isOnline]);

  const updateOnlineStatus = async () => {
    if (isOnline) {
      try {
        const response = await axios.post('http://localhost:5000/api/user/online', {
          online: isOnline,
        });
        console.log(response.data.message);
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      try {
        const response = await axios.post('http://localhost:5000/api/user/online', {
          online: isOnline,
        });
        console.log(response.data.message);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };


  return <>

    <Routes >
      <Route path='/' element={<Home />} />
      <Route path="/view/:id" element={<View />} />
      <Route path="/update/:id" element={<Update />} />
    </Routes>

  </>
}

export default App;
