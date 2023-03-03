import React, { FC, useState } from "react";
import Navbar from "./Navbar/Navbar";
// import Footer from "./Footer/Footer";
import { NodeProps } from "../../types/CommonType";
import Footer from "./Footer/Footer";
const Layout: FC<NodeProps> = ({ children }) => {
    //ToggleSidebar
    const [sideNavOpened, setSideNavOpened] = useState(true);
    const ToggleSidebar = () => {
        setSideNavOpened(!sideNavOpened);
        console.log("Pressed", sideNavOpened);

    }
    return (
        <>
            <Navbar/>
            {children}
            <Footer />
        </>
    );
};

export default Layout;
