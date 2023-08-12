import logo from './logo.svg';
import './App.css';
import Truck1 from "./img/truck1.png";
import Truck2 from "./img/truck2.png";
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [details, setDetails] = useState(true);
  const [formData, setFormData] = useState({
    slipno: "",
    vehno: "",
    consignor: "",
    charge: "",
    weight: "",
    type: "",
    item: "",
    datetime: "",
  });

  const submitClicked = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/formdata', formData)
      .then((response) => {
        console.log(response.data.message); // Data saved successfully
        fetchData(); // Fetch the updated data after successful submission
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const [filteredData, setFilteredData] = useState([]);

  // Fetch all data
  const fetchData = () => {
    axios.get('http://localhost:5000/api/fetchdata')
      .then((response) => {
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Search function
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();

  const searchClicked = () => {
    console.log('from data is ', fromDate, 'to date is ', toDate);
    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);

    const filteredItems = filteredData.filter((item) => {
      const itemDate = new Date(item.datetime);
      return itemDate >= startDate && itemDate <= endDate;
    });
    setFilteredData(filteredItems);
  }


  return (
    <div className='container'>
      {
        details ? <div className="mainBox px-5">
          <div className="buttonBox">
            <button>Veh Details</button>
            <button onClick={() => setDetails(false)}>View Report</button>
          </div>
          <div className='mainBoxTop'>
            <h2>Discreet Technology Venture</h2>
            <h3>Vehicle Details</h3>
          </div>
          <div className="slipNoBox row">
            <div className="col-6">
              <div className="row">
                <div className="col-3">
                  <span>Slip No</span>
                </div>
                <div className="col-4">
                  <input
                    type="text"
                    name="slipno"
                    value={formData.slipno}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-1">
                  <input type="checkbox" id='weightManual' />
                </div>
                <div className="col-6">
                  <label htmlFor="weightManual">2nd Weight Manual</label>
                </div>
              </div>
            </div>
          </div>
          <form>
            <div className="mainFormBox py-4 row">
              <div className="col-6">
                <div className="row my-3">
                  <div className="col-3">
                    <span>Veh No</span>
                  </div>
                  <div className="col-6">
                    <input
                      type="text"
                      name="vehno"
                      value={formData.vehno}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="row my-3">
                  <div className="col-3">
                    <span>Consignor</span>
                  </div>
                  <div className="col-6">
                    <input
                      type="text"
                      name="consignor"
                      value={formData.consignor}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="row my-3">
                  <div className="col-3">
                    <span>Charge</span>
                  </div>
                  <div className="col-6">
                    <input
                      type="text"
                      name="charge"
                      value={formData.charge}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="row my-3">
                  <div className="col-3">
                    <span>Weight</span>
                  </div>
                  <div className="col-6">
                    <input
                      type="text"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className='submitButtons'>
                  <button onClick={submitClicked}>Submit</button>
                  <button type='reset'>Cancel</button>
                </div>
              </div>
              <div className="col-6">
                <div className="row my-3">
                  <div className="col-3">
                    <span>Veh Type</span>
                  </div>
                  <div className="col-6">
                    <input
                      type="text"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="row my-3">
                  <div className="col-3">
                    <span>Item</span>
                  </div>
                  <div className="col-6">
                    <input
                      type="text"
                      name="item"
                      value={formData.item}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="row my-3">
                  <div className="col-3">
                    <span>Date/Time</span>
                  </div>
                  <div className="col-6">
                    <input
                      type="datetime-local"
                      name="datetime"
                      value={formData.datetime}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="row my-3 gx-0">
                  <div className="col-6">
                    <img src={Truck1} alt="" className='img-fluid' />
                  </div>
                  <div className="col-6">
                    <img src={Truck2} alt="" className='img-fluid' />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div> : <div className="mainBox px-5">
          <div className="buttonBox">
            <button onClick={() => setDetails(true)}>Veh Details</button>
            <button>View Report</button>
          </div>
          <div className='mainBoxTop'>
            <h2>Discreet Technology Venture</h2>
            <h3>View Report</h3>
          </div>

          <div className="row mt-4 mb-2 reportBox">
            <div className="col-6">
              <div className="row">
                <div className="col-3">
                  <span>From Date</span>
                </div>
                <div className="col-9">
                  <input type="datetime-local" onChange={(e) => setFromDate(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-3">
                  <span>To Date</span>
                </div>
                <div className="col-6">
                  <input type="datetime-local" onChange={(e) => setToDate(e.target.value)} />
                </div>
                <div className="col-3">
                  <button className='searchButton' onClick={searchClicked}>Search</button>
                </div>
              </div>
            </div>
          </div>
          {/* main table */}
          <div class="box">
            <div>Slip No.</div>
            <div>Veh No.</div>
            <div>Consignor</div>
            <div>Veh Type</div>
            <div>Item</div>
            <div>Charge</div>
            <div>Weight</div>
            <div>Is Sync</div>
            <div>Action</div>
            {
              filteredData && filteredData.map((ele) => {
                return <>
                  <div>{ele.slipno}</div>
                  <div>{ele.vehno}</div>
                  <div>{ele.consignor}</div>
                  <div>{ele.type}</div>
                  <div>{ele.item}</div>
                  <div>{ele.charge}</div>
                  <div>{ele.weight}</div>
                  <div><span>Yes</span></div>
                  <div><span className='viewEdit'>View</span><span  className='viewEdit'>Edit</span></div>
                </>
              })
            }
          </div>
        </div>
      }


    </div>
  );
}

export default App;
