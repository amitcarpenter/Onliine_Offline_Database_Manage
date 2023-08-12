import React, { useEffect, useState } from 'react';
import Truck1 from "./img/truck1.png";
import Truck2 from "./img/truck2.png";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import './update.css';

function Update() {
    const { id } = useParams();
    const [itemDetails, setItemDetails] = useState(null);
    const [updatedItem, setUpdatedItem] = useState(null);
    const [isOnline, setIsOnline] = useState(window.navigator.onLine);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch item details from the backend API
        if (isOnline) {
            setLoading(true)
            axios.get(`https://mern-vehicle-listing-app.onrender.com/api/items/${id}`)
                .then((response) => {
                    setItemDetails(response.data);
                    setLoading(false)
                })
                .catch((error) => {
                    console.error('Error fetching item details:', error);
                    setLoading(false)
                });
        } else {
            setLoading(true)
            axios.get(`http://localhost:5000/api/items/${id}`)
                .then((response) => {
                    setItemDetails(response.data);
                    setLoading(false)
                })
                .catch((error) => {
                    console.error('Error fetching item details:', error);
                    setLoading(false)
                });
        }

    }, [id]);

    const handleInputChange = (e) => {
        setUpdatedItem({
            ...updatedItem,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Send updated item data to the backend API
        if (isOnline) {
            axios.put(`https://mern-vehicle-listing-app.onrender.com/api/items/${id}`, updatedItem)
                .then((response) => {
                    console.log('Item updated successfully:', response.data);
                    toast("Data updated successfully !");
                })
                .catch((error) => {
                    console.error('Error updating item:', error);
                });
        } else {
            axios.put(`http://localhost:5000/api/items/${id}`, updatedItem)
                .then((response) => {
                    console.log('Item updated successfully:', response.data);
                    toast("Data updated successfully !");
                })
                .catch((error) => {
                    console.error('Error updating item:', error);
                });
        }

    };

    return (
        <div className='container'>
            <ToastContainer />
            <div className="mainBox px-5">
                <div className="buttonBox">
                    <button><Link to="/">Go Back</Link></button>
                </div>
                <div className='mainBoxTop pt-5 pt-md-0'>
                    <h2>Discreet Technology Venture</h2>
                    <h3>Update Vehicle Details</h3>
                </div>

                {
                    loading ? <div className="loadingDiv">
                    <span class="loaderPreview"></span>
                </div> : 
                    <>
                    {                   
                    itemDetails && (
                        <>
                            <div className="slipNoBox row">
                                <div className="col-12 col-md-6">
                                    <div className="row">
                                        <div className="col-5 col-md-3">
                                            <span>Slip No</span>
                                        </div>
                                        <div className="col-4">
                                            <input
                                                name="slipno"
                                                value={updatedItem?.slipno || itemDetails.slipno}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                </div>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="mainFormBox py-4 row">
                                    <div className="col-12 col-md-6">
                                        <div className="row my-3">
                                            <div className="col-5 col-md-3">
                                                <span>Veh No</span>
                                            </div>
                                            <div className="col-6">
                                                <input
                                                    name="vehno"
                                                    value={updatedItem?.vehno || itemDetails.vehno}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="row my-3">
                                            <div className="col-5 col-md-3">
                                                <span>Consignor</span>
                                            </div>
                                            <div className="col-6">
                                                <input
                                                    name="consignor"
                                                    value={updatedItem?.consignor || itemDetails.consignor}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="row my-3">
                                            <div className="col-5 col-md-3">
                                                <span>Charge</span>
                                            </div>
                                            <div className="col-6">
                                                <input
                                                    name="charge"
                                                    value={updatedItem?.charge || itemDetails.charge}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="row my-3">
                                            <div className="col-5 col-md-3">
                                                <span>Weight</span>
                                            </div>
                                            <div className="col-6">
                                                <input
                                                    name="weight"
                                                    value={updatedItem?.weight || itemDetails.weight}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="row my-3">
                                            <div className="col-5 col-md-3">
                                                <span>Veh Type</span>
                                            </div>
                                            <div className="col-6">
                                                <input
                                                    name="type"
                                                    value={updatedItem?.type || itemDetails.type}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="row my-3">
                                            <div className="col-5 col-md-3">
                                                <span>Item</span>
                                            </div>
                                            <div className="col-6">
                                                <input
                                                    name="item"
                                                    value={updatedItem?.item || itemDetails.item}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="row my-3">
                                            <div className="col-5 col-md-3">
                                                <span>Date/Time</span>
                                            </div>
                                            <div className="col-6">
                                                <input
                                                    name="datetime"
                                                    value={updatedItem?.datetime || itemDetails.datetime}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>                                       
                                    </div>
                                </div>
                                <button type="submit" className='updateButton'>Update Item</button>
                            </form>
                        </>
                    )}
                    </>
                }
                
            </div>
        </div>
    );
}

export default Update;

