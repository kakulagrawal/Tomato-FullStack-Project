import React, { useEffect, useState } from "react";
import "./Orders.css";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../assets/assets";

const Orders = ({ url }) => {

    const [orders, setOrders] = useState([]);

    const fetchAllOrders = async () => {

        try {

            const response = await axios.get(`${url}/api/order/list`);

            if (response.data.success) {
                setOrders(response.data.data);
            } else {
                toast.error("Error fetching orders");
            }

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }

    };

    const statusHandler = async (event, orderId) => {

        try {

            const response = await axios.post(`${url}/api/order/status`, {
                orderId,
                status: event.target.value
            });

            if (response.data.success) {
                toast.success("Order Status Updated");
                fetchAllOrders();
            } else {
                toast.error("Failed to update status");
            }

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }

    };

    useEffect(() => {
        fetchAllOrders();
    }, []);

    return (

        <div className="order add">

            <h3>Order Management</h3>

            <div className="order-list">

                {orders.map((order) => (

                    <div className="order-item" key={order._id}>

                        <img
                            src={assets.parcel_icon}
                            alt="parcel"
                        />

                        <div>

                            <p className="order-item-food">

                                {order.items.map((item, index) => {

                                    if (index === order.items.length - 1) {
                                        return `${item.name} x ${item.quantity}`;
                                    }

                                    return `${item.name} x ${item.quantity}, `;

                                })}

                            </p>

                            <p className="order-item-name">
                                {order.address.firstName} {order.address.lastName}
                            </p>

                            <div className="order-item-address">
                                <p>{order.address.street},</p>
                                <p>
                                    {order.address.city}, {order.address.state}, {order.address.country}
                                </p>
                                <p>{order.address.zipcode}</p>
                            </div>

                            <p>{order.address.phone}</p>

                        </div>

                        <p>Items : {order.items.length}</p>

                        <p>${order.amount}</p>

                        <p>
                            {order.payment ? (
                                <span className="paid">Paid</span>
                            ) : (
                                <span className="pending">Pending</span>
                            )}
                        </p>

                        <select
                            onChange={(event) => statusHandler(event, order._id)}
                            value={order.status}
                        >
                            <option value="Food Processing">Food Processing</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Delivered">Delivered</option>
                        </select>

                    </div>

                ))}

            </div>

        </div>

    );

};

export default Orders;