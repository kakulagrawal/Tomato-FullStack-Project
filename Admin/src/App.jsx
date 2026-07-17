import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import { Routes, Route, Navigate } from "react-router-dom";
import List from "./pages/List/List";
import Add from "./pages/Add/Add";
import Orders from "./pages/Orders/Orders";
import { ToastContainer } from "react-toastify";

const App = () => {

   const url = import.meta.env.VITE_BACKEND_URL;

    return (
        <div>

            <Navbar />

            <ToastContainer />

            <hr />

            <div className="app-content">

                <Sidebar />

                <Routes>

                    <Route
                        path="/"
                        element={<Navigate to="/add" replace />}
                    />

                    <Route
                        path="/add"
                        element={<Add url={url} />}
                    />

                    <Route
                        path="/list"
                        element={<List url={url} />}
                    />

                    <Route
                        path="/orders"
                        element={<Orders url={url} />}
                    />

                </Routes>

            </div>

        </div>
    );
};

export default App;