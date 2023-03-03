import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import { SettingsType } from "../../types/SettingsType";

import {
    Container,
    TitleContainer,
    ButtonContainer,
    UserContainer,
    MainContent,
    FileInput,
    Title,
} from "./SettingsElements";
import Layout from "../Layout/Layout";
import TextField from "@mui/material/TextField/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteUserApi, getUserApi, updateUserApi } from "../../services/Routes/UserApi";
import { STATUS_CODES } from "../../constants/GlobalConstants";
import { Alert } from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';

const About: FC<SettingsType> = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [openChangeProfile, setOpenChangeProfile] = useState(false);

    const [successText, setSuccessText] = useState("");
    const [errorText, setErrorText] = useState("");

    const [userId, setUserId] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [userImage, setUserImage] = useState("");

    useEffect(() => {
        const userImage = localStorage.getItem("userImage");
        const userAuth = localStorage.getItem("tpUserAuth");
        if (userAuth) {
            const userID =  JSON.parse(userAuth).id;
            const username = JSON.parse(userAuth).username;
            const email = JSON.parse(userAuth).email;
            setUsername(username);
            setEmail(email);
            setUserId(userID);
            // setUserImage(userImage || "");
            handleGetUserApi(userID);
        }
    }, []);
    // * For Modal
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 900,
        bgcolor: '#FFF7F0',
        borderRadius: '11px',
        boxShadow: 24,
    };
    
    
    const handleGetUserApi = async(userID : number) => {
        const dataObject = {
            id: userID
        }
        await getUserApi(dataObject)
        .then((res) => {
            console.log(res.data.data);
            if (res.data.status === STATUS_CODES.SUCCESS_CODE){
                setUserImage(res.data.data.profileImage);
            }
            else{
                console.log(res.data.message);
            }
        }).catch((err) => {
            console.log(err);
        });
    }
    const fileToBase64 = (file : File) => new Promise((resolve, reject) => {
        if (!file) return;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const handleOpenProfilebtn = () => {
        setOpenChangeProfile(true);
    }
    const handleCloseProfilebtn = () => {
        setOpenChangeProfile(false);  
        setUserImage("");
    }
    const handleChangeImg1 = async (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        setUserImage(await fileToBase64(event.target.files[0]) as string);
    }
    const redirectToPage = () => {
        navigate('/changepassword', { replace: true });
    }
    const handleSubmitProfile = async (event: any) => {
        event.preventDefault();
        const dataObject = {
            id: userId,
            profileImage: userImage
        }
        await updateUserApi(dataObject)
        .then((res) => {
            const resApiData = res?.data
            if (resApiData.status === STATUS_CODES.SUCCESS_CODE){
            setSuccessText("Updated profile Image Successfully!");
            setTimeout(()=>{
                setSuccessText("");
                setOpenChangeProfile(false);
                // setUserImage(userImage);
                window.location.reload();
            },2500)
            }
            else{
                setErrorText("profileImage failed to be updated!");
                setTimeout(()=>{
                    setErrorText("");
                },2500);
            }
        }).catch((error) => {
            console.log(error);
            setErrorText(error);

            setTimeout(() => {
                setErrorText("");
            }, 2500);
        });
    }
    const handleDeleteUser = async (event: any) => {
        const response = window.confirm("Are you sure you want to delete this account? You can't use this email anymore.");
        if (!response) return;
        const userId = JSON.parse(localStorage.getItem('tpUserAuth') || "").id;
        const dataObject = {
            data: {
                id: userId
            }
        }
        await deleteUserApi(dataObject)
            .then((res) => {
                console.log(res);
                const resApiData = res?.data;
                if (resApiData.status === STATUS_CODES.SUCCESS_CODE) {
                    setSuccessText("User deleted successfully!")
                    localStorage.removeItem("tpUserAuth");
                    setTimeout(() => {
                        setSuccessText("");
                        navigate('/', { replace: true });
                    }, 2500)
                } else {
                    setErrorText("User deleted failed!");
                    setTimeout(() => {
                        setErrorText("");
                    }, 2500);
                }
            })
            .catch((error) => {
                console.error(error);
                setErrorText("User deleted failed!");

                setTimeout(() => {
                    setErrorText("");
                }, 2500);
            });
    }
    return (
        <>
            <Layout>
                <Container>
                    <TitleContainer>
                        <Title>Settings</Title>
                        <h5>Hello {username}!</h5>
                        <hr></hr>
                    </TitleContainer>
                    {successText && <Alert variant="filled">{successText}</Alert>}
                    <MainContent>
                        <UserContainer>
                            <Avatar alt={username || ""} src={userImage || "/static/images/avatar/1.jpg"} className="profile-image" />
                            <h3>Username: {username || "-"}</h3>
                        </UserContainer>
                        <ButtonContainer>
                            <Button variant="contained" color="primary" onClick={handleOpenProfilebtn}>Change Profile Picture</Button>
                            <Button variant="contained" color="secondary" onClick={redirectToPage}>Change Password</Button>
                            <Button variant="contained" color="error" onClick={handleDeleteUser}>Delete Account</Button>
                        </ButtonContainer>
                        <h3>Email: {email || "-"}</h3>
                        {/* <h3>Account Created on {createdAt}</h3> */}
                    </MainContent>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={openChangeProfile}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={openChangeProfile}>
                            <Box sx={style}>
                                <div className="relative w-full h-full max-w-4xl md:h-auto">
                                    {/* <!-- Modal content --> */}
                                    <div className="relative modal-bg rounded-lg shadow dark:bg-gray-700">
                                        {/* <!-- Modal header --> */}
                                        <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
                                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                                                Change profile picture
                                            </h3>
                                        </div>
                                        {/* <!-- Modal body --> */}
                                        {errorText && <Alert severity="error">{errorText}</Alert>}
                                        <div className="p-6 space-y-6 flex justify-center">
                                            <FileInput onChange={handleChangeImg1} inputImage={userImage} type="file" accept=".png, .jpg, .jpeg" />
                                        </div>
                                        {/* <!-- Modal footer --> */}
                                        <div className="flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                            <button onClick={handleSubmitProfile} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                                            <button onClick={handleCloseProfilebtn} type="button" className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-white focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </Box>
                        </Fade>
                    </Modal>
                </Container>
            </Layout>
        </>
    );
};

export default About;
