import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const PlaceOrder = () => {

    const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        phone: ""
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const placeOrder = async (event) => {
        event.preventDefault();

        let orderItems = [];

        food_list.forEach((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = { ...item };
                itemInfo.quantity = cartItems[item._id];
                orderItems.push(itemInfo);
            }
        });

        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 2,
        };

        try {
            const response = await axios.post(
                url + "/api/order/place",
                orderData,
                {
                    headers: {
                        token
                    }
                }
            );

            if (response.data.success) {
                const { session_url } = response.data;
                window.location.replace(session_url);
            } else {
                alert(response.data.message);
            }

        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        }
    };

    return (
        <form onSubmit={placeOrder} className="place-order">

            <div className="place-order-left">

                <p className="title">Delivery Information</p>

                <div className="multi-fields">
                    <input
                        required
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={data.firstName}
                        onChange={onChangeHandler}
                    />

                    <input
                        required
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={data.lastName}
                        onChange={onChangeHandler}
                    />
                </div>

                <input
                    required
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={data.email}
                    onChange={onChangeHandler}
                />

                <input
                    required
                    type="text"
                    name="street"
                    placeholder="Street"
                    value={data.street}
                    onChange={onChangeHandler}
                />

                <div className="multi-fields">
                    <input
                        required
                        type="text"
                        name="city"
                        placeholder="City"
                        value={data.city}
                        onChange={onChangeHandler}
                    />

                    <input
                        required
                        type="text"
                        name="state"
                        placeholder="State"
                        value={data.state}
                        onChange={onChangeHandler}
                    />
                </div>

                <div className="multi-fields">
                    <input
                        required
                        type="text"
                        name="zipCode"
                        placeholder="Zip Code"
                        value={data.zipCode}
                        onChange={onChangeHandler}
                    />

                    <input
                        required
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={data.country}
                        onChange={onChangeHandler}
                    />
                </div>

                <input
                    required
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={data.phone}
                    onChange={onChangeHandler}
                />

            </div>

            <div className="place-order-right">

                <div className="cart-total">
                    <h2>Cart Totals</h2>

                    <div>

                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>

                        <hr />

                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
                        </div>

                        <hr />

                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>
                                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
                            </b>
                        </div>

                    </div>

                    <button type="submit">
                        PROCEED TO PAYMENT
                    </button>

                </div>

            </div>

        </form>
    );
};

export default PlaceOrder;