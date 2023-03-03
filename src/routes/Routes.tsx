import {BrowserRouter, Route, Routes as Router } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "../components/Login/Login";
import SignUp from "../components/SignUp/SignUp";
import Home from "../components/Home/Home";
import About from "../components/About/About";
import Restaurants from "../components/Restaurants/Restaurants";
import Layout from "../components/Layout/Layout";
import RestaurantDetails from "../components/RestaurantDetails/RestaurantDetails";
import Contact from "../components/Contact/Contact";
import Settings from "../components/Settings/Settings";
import ForgetPassword from "../components/ForgetPassword/ForgetPassword";
import ResetPassword from "../components/ResetPassword/ResetPassword";
import ChangePassword from "../components/ChangePassword/ChangePassword";
function Routes() {
    return (
        <>
            <BrowserRouter>
                <Router>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    {/* <Route element={<PrivateRoute />}> */}
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/restaurants" element={<Restaurants />} />
                    <Route path="/restaurantdetail" element={<RestaurantDetails />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/changepassword" element={<ChangePassword />} />
                    <Route path="/forgetpassword" element={<ForgetPassword />} />
                    <Route path="/resetpassword" element={<ResetPassword />} />
                    {/* </Route> */}
                </Router>
            </BrowserRouter>
        </>
    );
}

export default Routes;
