import React, { useState, useEffect, useContext } from "react";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import {
    Container,
} from "./FooterElements";


const Footer = () => {

    const currentRoute = useLocation();
    const navigate = useNavigate();

    return (
        <>
            <Container>
                <footer className="p-4 bg-gray-900 dark:bg-gray-900 shadow md:flex md:items-center md:justify-end md:p-6 dark:bg-gray-800">
                    <span className="text-sm text-white sm:text-center dark:text-gray-400">© 2023 <a href="http://localhost:3000" className="hover:underline">Heavenly Eats™</a>. All Rights Reserved.
                    </span>
                </footer>
            </Container>
        </>
    );
};

export default Footer;

