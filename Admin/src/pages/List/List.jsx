import React, { useState, useEffect } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ url }) => {

    const [list, setList] = useState([]);
    const [editId, setEditId] = useState(null);

    const [editData, setEditData] = useState({
        name: "",
        category: "",
        price: "",
        description: ""
    });

    const fetchList = async () => {
        const response = await axios.get(`${url}/api/food/list`);

        if (response.data.success) {
            setList(response.data.data);
        } else {
            toast.error("Error fetching food list");
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    const removeFood = async (foodId) => {

        const response = await axios.post(
            `${url}/api/food/remove`,
            { _id: foodId }
        );

        if (response.data.success) {
            toast.success(response.data.message);
            fetchList();
        } else {
            toast.error("Error");
        }
    };

    const startEditing = (item) => {

        setEditId(item._id);

        setEditData({
            name: item.name,
            category: item.category,
            price: item.price,
            description: item.description
        });
    };

    const cancelEdit = () => {
        setEditId(null);
    };

    const saveFood = async () => {

        const response = await axios.post(
            `${url}/api/food/update`,
            {
                _id: editId,
                ...editData
            }
        );

        if (response.data.success) {

            toast.success(response.data.message);

            setEditId(null);

            fetchList();

        } else {

            toast.error(response.data.message);

        }

    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        setEditData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    return (

        <div className="list-add flex-col">

            <p>All Foods List</p>

            <div className="list-table">

                <div className="list-table-format">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Description</b>
                    <b>Actions</b>
                </div>

                {list.map((item) => (

                    <div key={item._id} className="list-table-format">

                        <img
                            src={`${url}/images/${item.image}`}
                            alt=""
                        />

                        {editId === item._id ? (
                            <>
                                <input
                                    name="name"
                                    value={editData.name}
                                    onChange={handleChange}
                                />

                                <input
                                    name="category"
                                    value={editData.category}
                                    onChange={handleChange}
                                />

                                <input
                                    name="price"
                                    type="number"
                                    value={editData.price}
                                    onChange={handleChange}
                                />

                                <input
                                    name="description"
                                    value={editData.description}
                                    onChange={handleChange}
                                />

                                <div className="action-buttons">

                                    <button
                                        className="save-btn"
                                        onClick={saveFood}
                                    >
                                        Save
                                    </button>

                                    <button
                                        className="cancel-btn"
                                        onClick={cancelEdit}
                                    >
                                        Cancel
                                    </button>

                                </div>

                            </>
                        ) : (
                            <>
                                <p>{item.name}</p>

                                <p>{item.category}</p>

                                <p>${item.price}</p>

                                <p>{item.description}</p>

                                <div className="action-buttons">

                                    <button
                                        className="edit-btn"
                                        onClick={() => startEditing(item)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={() => removeFood(item._id)}
                                    >
                                        Delete
                                    </button>

                                </div>

                            </>
                        )}

                    </div>

                ))}

            </div>

        </div>

    );
};

export default List;