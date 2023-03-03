import React, {useState, useEffect, useContext } from "react";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { checkTokenApi, getUserApi } from "../../../services/Routes/UserApi";
import { UserAuthContext } from "../../../contexts/UserAuthContext";
import { UserAuthType } from "../../../types/UserAuth";
import {
    Container,
} from "./NavbarElements";
import { Navbar } from "flowbite-react/lib/esm/components/Navbar";
import { Button } from "flowbite-react/lib/esm/components/Button";
import Menu from "@mui/material/Menu";
import MenuItem from '@mui/material/MenuItem';
import Avatar from "@mui/material/Avatar";
import ListItemIcon from "@mui/material/ListItemIcon/ListItemIcon";
import Divider from "@mui/material/Divider/Divider";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { STATUS_CODES } from "../../../constants/GlobalConstants";
const LogoImg = "logo.png";

const Navigationbar = () => {
    const { isAuth, handleLogout, userInfo } = useContext(UserAuthContext) as UserAuthType;
    const currentRoute = useLocation();
    const navigate = useNavigate();
    
    const [userID, setUserID] = useState("");
    let localUsername;
    let userId : any;
    if (localStorage.getItem('tpUserAuth')){
        localUsername = JSON.parse(localStorage.getItem('tpUserAuth') || "").username;
        userId = JSON.parse(localStorage.getItem('tpUserAuth') || "").id;
    }
    const username = userInfo.username || localUsername
    // console.log(currentRoute.pathname, currentRoute.pathname[0]);
    const [userImage, setUserImage] = useState("");
    const [userLoginStatus, setUserLoginStatus] = useState(false);
    const [anchorEl_Menu, setAnchorEl_Menu] = useState<null | HTMLElement>(null);

    const [anchorEl_LoginMenu, setAnchorEl_LoginMenu] = useState<null | HTMLElement>(null);
    const openLoginMenu = Boolean(anchorEl_LoginMenu);
    const handleOpen_loginMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl_LoginMenu(event.currentTarget);
    };
    const handleCloseLoginMenu = () => {
        setAnchorEl_LoginMenu(null);
    };

    const handleRedirectToPage = () => {
        setAnchorEl_LoginMenu(null);
        navigate('/settings', { replace: true});
    }

    const isMenuOpen = Boolean(anchorEl_Menu);
    const handleClick_loginbtn = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl_Menu(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl_Menu(null);
    };
    const handleMenuClick_loginbtn = () => {
        setAnchorEl_Menu(null);
        navigate("/login", { replace: true });
    };
    const handleMenuClick_signupbtn = () => {
        setAnchorEl_Menu(null);
        navigate("/signup", { replace: true });
    };


    useEffect(()=> {
        handleShowAvatar();
    },[])
    const handleShowAvatar = async () => {
        const userAuth = localStorage.getItem("tpUserAuth");
        if (!userAuth) return;

        const userAuthData = JSON.parse(userAuth);
        const token = userAuthData;
        
        if (isAuth()){
            setUserLoginStatus(true);
            console.log("Logged in");
        }

        // * Check if token is valid
        await checkTokenApi(token)
        .then((res) => {
            console.log(res.data.token);
            if (res.data.token === "Invalid token") {
                localStorage.removeItem("tpUserAuth");
                return
            };
            setUserLoginStatus(true);
            console.log("Logged in");
            
        }).catch((err) => {
            console.log(err);
        });
        
        const dataObject = {
            id: userId
        }
        await getUserApi(dataObject)
        .then((res) => {
            console.log(res.data.data);
            if (res.data.status === STATUS_CODES.SUCCESS_CODE){
                setUserImage(res.data.data.profileImage);
                localStorage.setItem("userImage", res.data.data.profileImage);
            }
            else{
                console.log(res.data.message);
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <>
            <Container>
                <Navbar
                    className="!bg-gray-900 px-2 sm:px-4 py-2.5 dark:bg-gray-900 w-full z-20 top-0 left-0"
                    fluid={true}                >
                    <Navbar.Brand href="/" className="logobox">
                        <img
                            src={LogoImg}
                            className="mr-3 h-6 sm:h-9"
                            alt="Heavenly Eats"
                        />
                    </Navbar.Brand>
                    <div className="flex md:order-2 p-2">
                        {userLoginStatus ?  <Avatar onClick={handleOpen_loginMenu} alt={username} src={userImage|| "/static/images/avatar/1.jpg"} className="mr-3" /> : <Button
                        onClick={handleClick_loginbtn}
                        className="mr-3">
                            Login
                        </Button> 
                        }
                        
                        <Menu
                            id="nav-loginbtn-menu"
                            anchorEl={anchorEl_Menu}
                            open={isMenuOpen}
                            onClose={handleCloseMenu}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        >
                            <MenuItem onClick={handleMenuClick_loginbtn}>Login</MenuItem>
                            <MenuItem onClick={handleMenuClick_signupbtn}>Sign Up</MenuItem>
                        </Menu>
                        <Menu
                            anchorEl={anchorEl_LoginMenu}
                            id="account-menu"
                            open={openLoginMenu}
                            onClose={handleCloseLoginMenu}
                            onClick={handleCloseLoginMenu}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem onClick={handleCloseLoginMenu}>
                                <Avatar src={userImage|| "/static/images/avatar/1.jpg"} /> {username || "Profile"}
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={handleRedirectToPage}>
                                <ListItemIcon>
                                    <Settings fontSize="small" />
                                </ListItemIcon>
                                Settings
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                        <Navbar.Toggle />
                    </div>
                    <Navbar.Collapse>
                        <NavLink
                            className={currentRoute.pathname === "/" ? "text-white nav-linktext" : "text-gray-300 hover:text-white nav-linktext"}
                            to="/"                        >
                            Home
                        </NavLink>
                        <NavLink to="/about" className={currentRoute.pathname === "/about" ? "text-white nav-linktext" : "text-gray-300 md:hover:text-white nav-linktext"}>
                            About
                        </NavLink>
                        <NavLink to="/restaurants" className={currentRoute.pathname === "/restaurants" || currentRoute.pathname === "/restaurantdetail" ? "text-white nav-linktext" : "text-gray-300 md:hover:text-white nav-linktext"}>
                            Restaurants
                        </NavLink>
                        <NavLink to="/contact" className={currentRoute.pathname === "/contact" ? "text-white nav-linktext" : "text-gray-300 md:hover:text-white nav-linktext"}>
                            Contact
                        </NavLink>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        </>
    );
};

export default Navigationbar;
function getUserInfo() {
    throw new Error("Function not implemented.");
}

