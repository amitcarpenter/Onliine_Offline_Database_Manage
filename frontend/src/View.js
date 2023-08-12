import React, { useEffect, useState } from 'react';
import Truck1 from "./img/truck1.png";
import Truck2 from "./img/truck2.png";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function View() {
    const { id } = useParams();
    const [itemDetails, setItemDetails] = useState(null);
    const [isOnline, setIsOnline] = useState(window.navigator.onLine);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOnline) {
            const fetchData = async () => {
                setLoading(true)
                try {
                    const response = await axios.get(`https://mern-vehicle-listing-app.onrender.com/api/items/${id}`);
                    setItemDetails(response.data);
                    setLoading(false)
                } catch (error) {
                    console.error('Error:', error);
                    setLoading(false)
                }
            };

            fetchData();
        } else {
            const fetchData = async () => {
                setLoading(true)
                try {
                    const response = await axios.get(`http://localhost:5000/api/items/${id}`);
                    setItemDetails(response.data);
                    setLoading(false)
                } catch (error) {
                    console.error('Error:', error);
                    setLoading(false)
                }
            };

            fetchData();
        }
    }, [id]);
    console.log(itemDetails);
    return (
        <div className='container'>
            {
                <div className="mainBox px-5">
                    <div className="buttonBox">
                        <button ><Link to="/">Go Back</Link></button>
                    </div>
                    <div className='mainBoxTop pt-5 pt-md-0'>
                        <h2>Discreet Technology Venture</h2>
                        <h3>Vehicle Details</h3>
                    </div>
                    {
                        loading ? <div className="loadingDiv">
                            <span class="loaderPreview"></span>
                        </div> : <>
                            <div className="slipNoBox row">
                                <div className="col-12 col-md-6">
                                    <div className="row">
                                        <div className="col-5 col-md-3">
                                            <span>Slip No</span>
                                        </div>
                                        <div className="col-6 col-md-4">
                                            <input
                                                disabled
                                                value={itemDetails && itemDetails.slipno}
                                            />
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
                                            <div className="col-7 col-md-6">
                                                <input
                                                    disabled
                                                    value={itemDetails && itemDetails.vehno}
                                                />
                                            </div>
                                        </div>
                                        <div className="row my-3">
                                            <div className="col-5 col-md-3">
                                                <span>Consignor</span>
                                            </div>
                                            <div className="col-7 col-md-6">
                                                <input
                                                    disabled
                                                    value={itemDetails && itemDetails.consignor}
                                                />
                                            </div>
                                        </div>
                                        <div className="row my-3">
                                            <div className="col-5 col-md-3">
                                                <span>Charge</span>
                                            </div>
                                            <div className="col-7 col-md-6">
                                                <input
                                                    disabled
                                                    value={itemDetails && itemDetails.charge}
                                                />
                                            </div>
                                        </div>
                                        <div className="row my-3">
                                            <div className="col-5 col-md-3">
                                                <span>Weight</span>
                                            </div>
                                            <div className="col-7 col-md-6">
                                                <input
                                                    disabled
                                                    value={itemDetails && itemDetails.weight}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="row my-3">
                                            <div className="col-5 col-md-3">
                                                <span>Veh Type</span>
                                            </div>
                                            <div className="col-7 col-md-6">
                                                <input
                                                    disabled
                                                    value={itemDetails && itemDetails.type}
                                                />
                                            </div>
                                        </div>
                                        <div className="row my-3">
                                            <div className="col-5 col-md-3">
                                                <span>Item</span>
                                            </div>
                                            <div className="col-7 col-md-6">
                                                <input
                                                    disabled
                                                    value={itemDetails && itemDetails.item}
                                                />
                                            </div>
                                        </div>
                                        <div className="row my-3">
                                            <div className="col-5 col-md-3">
                                                <span>Date/Time</span>
                                            </div>
                                            <div className="col-7 col-md-6">
                                                <input
                                                    disabled
                                                    value={itemDetails && itemDetails.datetime}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </>
                    }

                </div>
            }


        </div>
    );
}

export default View