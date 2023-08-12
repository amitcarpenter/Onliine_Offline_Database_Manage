import logo from './logo.svg';
import './App.css';
import Truck1 from "./img/truck1.png";
import Truck2 from "./img/truck2.png";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingImg from './img/loading.gif';
import { AiOutlineSearch, AiOutlineEye } from 'react-icons/ai';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

function Home() {
    const [details, setDetails] = useState(true);
    const [sending, setSending] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isOnline, setIsOnline] = useState(window.navigator.onLine);


    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch offline data
                const response = await fetch('http://localhost:5000/api/fetchoffline');
                const offlineData = await response.json();
                console.log(offlineData);

                if (offlineData.length >= 1) {


                    // Send offline data to the backend using map
                    const promises = offlineData.map(async (ele) => {
                        const formData = {
                            slipno: ele.slipno,
                            vehno: ele.vehno,
                            consignor: ele.consignor,
                            charge: ele.charge,
                            weight: ele.weight,
                            type: ele.type,
                            item: ele.item,
                            datetime: ele.datetime,
                        };

                        try {
                            const response = await axios.post('https://mern-vehicle-listing-app.onrender.com/api/formdata', formData);
                            console.log(response.data.message); // Data saved successfully
                            return true; // Return a value to resolve the promise
                        } catch (error) {
                            console.error('Error:', error);
                            return false; // Return a value to resolve the promise
                        }
                    });

                    // Wait for all promises to resolve
                    const results = await Promise.all(promises);

                    // Check if all requests were successful
                    if (results.every((result) => result === true)) {
                        // Update the form data and set sending to false
                        setFormData({
                            slipno: "",
                            vehno: "",
                            consignor: "",
                            charge: "",
                            weight: "",
                            type: "",
                            item: "",
                            datetime: "",
                        });
                        setSending(false);
                        toast("Data synced successfully !");
                    } else {
                        // Handle the case when one or more requests failed
                        toast("OOPS there's an error !");
                    }
                }

            } catch (error) {
                console.error('Error fetching or sending data:', error);
            }
        };

        // Check if the app is online and make the API calls
        if (isOnline) {
            fetchData();
        }
    }, [isOnline]);





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
        // offline and online condition
        if (isOnline) {
            if (formData.datetime !== "" && formData.slipno !== "") {
                setSending(true)
                axios.post('https://mern-vehicle-listing-app.onrender.com/api/formdata', formData)
                    .then((response) => {
                        console.log(response.data.message); // Data saved successfully
                        fetchData(); // Fetch the updated data after successful submission
                        setFormData({
                            slipno: "",
                            vehno: "",
                            consignor: "",
                            charge: "",
                            weight: "",
                            type: "",
                            item: "",
                            datetime: "",
                        });
                        toast("Data saved successfully !");
                        setSending(false)
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        toast("OOPS thers an error !");
                        setSending(false)
                    });
            } else {
                toast("Enter at least a date and slip no");
            }
        } else {
            if (formData.datetime !== "" && formData.slipno !== "") {
                setSending(true)
                axios.post('http://localhost:5000/api/formdata', { formData })
                    .then((response) => {
                        console.log(response.data.message); // Data saved successfully
                        fetchData(); // Fetch the updated data after successful submission
                        setFormData({
                            slipno: "",
                            vehno: "",
                            consignor: "",
                            charge: "",
                            weight: "",
                            type: "",
                            item: "",
                            datetime: "",
                        });
                        toast("Data saved successfully to offline !");
                        setSending(false)
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        toast("OOPS thers an error in offline !");
                        setSending(false)
                    });
            } else {
                toast("Enter at least a date and slip no");
            }
        }

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
        if (isOnline) {
            axios.get('https://mern-vehicle-listing-app.onrender.com/api/fetchdata')
                .then((response) => {
                    setFilteredData(response.data);
                    console.log(response.data);
                    setLoading(false)
                })
                .catch((error) => {
                    console.error('Error:', error);
                    setLoading(false)
                });
            console.log('req going to https://mern-vehicle-listing-app.onrender.com/api/fetchdata');
        } else {
            axios.get('http://localhost:5000/api/fetchdata')
                .then((response) => {
                    setFilteredData(response.data);
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            console.log('req going to http://localhost:5000/api/fetchdata');
        }

    };

    useEffect(() => {
        fetchData();
    }, []);

    // Search function
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const searchClicked = () => {
        if (fromDate != "" && toDate != "") {
            console.log('from data is ', fromDate, 'to date is ', toDate);
            const startDate = new Date(fromDate);
            const endDate = new Date(toDate);

            const filteredItems = filteredData.filter((item) => {
                const itemDate = new Date(item.datetime);
                return itemDate >= startDate && itemDate <= endDate;
            });
            setFilteredData(filteredItems);
        } else {
            setFilteredData(filteredData);
        }

    }

    // reset form
    const resetForm = (e) => {
        e.preventDefault();
        setFormData({
            slipno: "",
            vehno: "",
            consignor: "",
            charge: "",
            weight: "",
            type: "",
            item: "",
            datetime: ""
        })
    }

    // delete item
    const DeleteItem = (id) => {
        if (isOnline) {
            axios
                .delete(`https://mern-vehicle-listing-app.onrender.com/api/items/${id}`)
                .then((response) => {
                    console.log(response.data.message);
                    toast("Data deleted successfully");
                    fetchData();
                })
                .catch((error) => {
                    console.log('Error deleting item:', error.response.data.error);
                });

        } else {
            axios
                .delete(`http://localhost:5000/api/items/${id}`)
                .then((response) => {
                    console.log(response.data.message);
                })
                .catch((error) => {
                    console.log('Error deleting item:', error.response.data.error);
                });
            fetchData();
        }
    }

    // for offline mode
    // const submitClicked = (e) => {


    // }   

    return (
        <div className='container'>
            <ToastContainer />
            {
                details ? <div className="mainBox px-5">
                    <div className="buttonBox">
                        <button className='button-89'>Veh Details</button>
                        <button onClick={() => setDetails(false)}>View Report</button>
                    </div>
                    <div className='mainBoxTop pt-5 pt-md-0'>
                        <h2>Discreet Technology Venture</h2>
                        <h3>Vehicle Details</h3>
                    </div>
                    <div className="slipNoBox row">
                        <div className="col-12 col-md-6">
                            <div className="row">
                                <div className="col-5 col-md-3">
                                    <span>Slip No</span>
                                </div>
                                <div className="col-7">
                                    <input
                                        type="text"
                                        name="slipno"
                                        value={formData.slipno}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="row">
                                <div className="col-3">
                                    <input type="checkbox" id='weightManual' />
                                </div>
                                <div className="col-9">
                                    <label htmlFor="weightManual">2nd Weight Manual</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <form>
                        <div className="mainFormBox py-4 row">
                            <div className="col-12 col-md-6">
                                <div className="row my-3">
                                    <div className="col-5 col-md-3">
                                        <span>Veh No</span>
                                    </div>
                                    <div className="col-7">
                                        <input
                                            type="text"
                                            name="vehno"
                                            value={formData.vehno}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="row my-3">
                                    <div className="col-5 col-md-3">
                                        <span>Consignor</span>
                                    </div>
                                    <div className="col-7">
                                        <input
                                            type="text"
                                            name="consignor"
                                            value={formData.consignor}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="row my-3">
                                    <div className="col-5 col-md-3">
                                        <span>Charge</span>
                                    </div>
                                    <div className="col-7">
                                        <input
                                            type="text"
                                            name="charge"
                                            value={formData.charge}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="row my-3">
                                    <div className="col-5 col-md-3">
                                        <span>Weight</span>
                                    </div>
                                    <div className="col-7">
                                        <input
                                            type="text"
                                            name="weight"
                                            value={formData.weight}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className='submitButtons d-none d-md-block'>
                                    <button onClick={submitClicked}> {sending ? <img src={LoadingImg} alt="" className='img-fluid h-5' /> : 'submit'}</button>
                                    <button onClick={(e) => resetForm(e)}>Cancel</button>
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="row my-3">
                                    <div className="col-5 col-md-3">
                                        <span>Veh Type</span>
                                    </div>
                                    <div className="col-7">
                                        <input
                                            type="text"
                                            name="type"
                                            value={formData.type}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="row my-3">
                                    <div className="col-5 col-md-3">
                                        <span>Item</span>
                                    </div>
                                    <div className="col-7">
                                        <input
                                            type="text"
                                            name="item"
                                            value={formData.item}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="row my-3">
                                    <div className="col-5 col-md-3">
                                        <span>Date/Time</span>
                                    </div>
                                    <div className="col-7">
                                        <input
                                            type="datetime-local"
                                            name="datetime"
                                            value={formData.datetime}
                                            onChange={handleInputChange}
                                            id='datetime'
                                        />
                                    </div>
                                </div>
                                <div className='submitButtons d-block d-md-none'>
                                    <button onClick={submitClicked} className='button-89'> {sending ? <img src={LoadingImg} alt="" className='img-fluid h-5' /> : 'submit'}</button>
                                    <button onClick={(e) => resetForm(e)}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div> : <div className="mainBox px-5">
                    <div className="buttonBox">
                        <button onClick={() => setDetails(true)}>Veh Details</button>
                        <button>View Report</button>
                    </div>
                    <div className='mainBoxTop pt-5 pt-md-0'>
                        <h2>Discreet Technology Venture</h2>
                        <h3>View Report</h3>
                    </div>

                    <div className="row mt-4 mb-2 reportBox">
                        <div className="col-12 col-md-6">
                            <div className="row">
                                <div className="col-3">
                                    <span>From Date</span>
                                </div>
                                <div className="col-9">
                                    <input type="datetime-local" onChange={(e) => setFromDate(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="row">
                                <div className="col-3">
                                    <span>To Date</span>
                                </div>
                                <div className="col-6">
                                    <input type="datetime-local" onChange={(e) => setToDate(e.target.value)} />
                                </div>
                                <div className="col-6 col-lg-3">
                                    <button className='searchButton' onClick={searchClicked}> <span><AiOutlineSearch /></span> Search</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* main table */}
                    <div className="boxArea">
                        {
                            loading ? <div className="loadingDiv">
                                <span class="loaderPreview"></span>
                            </div> :

                                <table>
                                    <tr>

                                        <th>Slip No. </th>
                                        <th>Veh No. </th>
                                        <th>Consignor</th>
                                        <th>Veh Type </th>
                                        <th>Item </th>
                                        <th>Charge</th>
                                        <th>Weight </th>
                                        <th>Is Sync</th>
                                        <th>Action
                                        </th>
                                    </tr>
                                    {
                                        filteredData.length === 0 ? <div className='noDataDiv'>There is no data to show</div> : filteredData && filteredData.map((ele) => {
                                            return <tr>
                                                <td>{ele.slipno}</td>
                                                <td>{ele.vehno}</td>
                                                <td>{ele.consignor}</td>
                                                <td>{ele.type}</td>
                                                <td>{ele.item}</td>
                                                <td>{ele.charge}</td>
                                                <td>{ele.weight}</td>
                                                <td><span>Yes</span></td>
                                                <td><Link to={`/view/${ele._id}`} className='viewEdit'><AiOutlineEye /></Link><Link to={`update/${ele._id}`} className='viewEdit'><FiEdit /></Link> <span onClick={() => DeleteItem(ele._id)}><FiTrash2 /></span></td>
                                            </tr>
                                        })
                                    }

                                </table>
                        }
                    </div>
                </div>
            }


        </div>
    );
}

export default Home;