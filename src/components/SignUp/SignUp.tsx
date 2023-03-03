import React, { FC, useContext, useEffect, useState, ChangeEvent } from "react";
import { UserAuthContext } from "../../contexts/UserAuthContext";
import { UserAuthType } from "../../types/UserAuth";
import { TbUserCircle } from "react-icons/tb";
import { RiLockPasswordLine } from "react-icons/ri";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {
    Container,
    MainInputContainer,
    InputContainerWrapper,
    InputContainer,
    Card,
    Icon,
    Input,
    Button,
    Title,
    InputTitle,
    Image,
    CardContainer,
    SuccessText,
    ErrorText,
} from "./SignUpElements";
import Layout from "../Layout/Layout";
import Alert from "@mui/material/Alert";
import { signupApi } from "../../services/Routes/UserApi";
import { STATUS_CODES } from "../../constants/GlobalConstants";
const LogoImg = "logo.png";

const SignUp: FC = () => {
    const navigate = useNavigate();    


    const [userEmail, setUserEmail] = useState("");
    const [userEmailConfirm, setUserEmailConfirm] = useState("");
    const [userName, setUserName] = useState("");
    const [userContact, setUserContact] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userPasswordConfirm, setUserPasswordConfirm] = useState("");

    const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => setUserEmail(event.target.value);
    const onChangeEmailConfirm = (event: ChangeEvent<HTMLInputElement>) => setUserEmailConfirm(event.target.value);
    const onChangeUsername = (event: ChangeEvent<HTMLInputElement>) => setUserName(event.target.value);
    const onChangeContact = (event: ChangeEvent<HTMLInputElement>) => setUserContact(event.target.value);
    const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => setUserPassword(event.target.value);
    const onChangePasswordConfirm = (event: ChangeEvent<HTMLInputElement>) => setUserPasswordConfirm(event.target.value);

    const [errorText, setErrorText] = useState("");
    const [successText, setSuccessText] = useState("");

    const handleSignUpClick = async () => {
        // * Validation
        // * If empty
        if (!userName || !userEmail || !userEmailConfirm || !userPassword || !userPasswordConfirm || !userContact) {
            setErrorText("Please fill in all the required fields.");
            setTimeout(() => {
                setErrorText("");
            }, 2500);

            return;
        }
        // * Email validation
        const isValidEmail = (email : string) => {
            const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regex.test(email);
        }
        const validEmail = isValidEmail(userEmail);
        if (!validEmail) {
            setErrorText("Please enter a valid email address");
            setTimeout(() => {
                setErrorText("");
            }, 2500);
            return;
        }
        // * If email dont match
        if(userEmail !== userEmailConfirm){
            setErrorText("Email does not match!");
            setTimeout(() => {
                setErrorText("");
            }, 2500);
            return;
        }
        // * If password dont match
        if(userPassword !== userPasswordConfirm){
            setErrorText("Password does not match!");
            setTimeout(() => {
                setErrorText("");
            }, 2500);
            return;
        }

        // * Store into payload
        const dataObject = {
            username: userName,
            password: userPassword,
            email: userEmail,
            contactnumber: userContact
        }
        console.log(dataObject);

        await signupApi(dataObject)
        .then((res) => {
            console.log(res.data);
            if(res.data.status === STATUS_CODES.SUCCESS_CODE){
                console.log(res);
                setSuccessText("Successfully signed up! Welcome to Heavenly Eats!");
                setTimeout(() => {
                    setSuccessText("");
                    navigate('/login');
                }, 2500);
                return;
            }
        })
        .catch((err) => {
            console.log(err);
        });

    };
    
    
    return (
        <>
            <Layout>
                <Container>
                    <Card>
                        <CardContainer>
                            <Image src={LogoImg} alt="logo" />
                            <Title>Create an account</Title>
                            {successText && <Alert className="w-full" severity="success">{successText}</Alert>}
                            {errorText && <Alert className="w-full" severity="error">{errorText}</Alert>}
                            <MainInputContainer>
                                {/* Email Address */}
                            <InputContainerWrapper>
                                <InputTitle>Email</InputTitle>
                                <InputContainer>
                                    <Icon>
                                        <TbUserCircle size={"25px"} />
                                    </Icon>
                                    <Input
                                        placeholder="Email Address"
                                        // autoFocus
                                        name="email"
                                        onChange={onChangeEmail}
                                    />
                                </InputContainer>
                            </InputContainerWrapper>
                            <InputContainerWrapper>
                                <InputTitle>Confirm Email</InputTitle>
                                <InputContainer>
                                    <Icon>
                                        <TbUserCircle size={"25px"} />
                                    </Icon>
                                    <Input
                                        placeholder="Email Address"
                                        // autoFocus
                                        name="email"
                                        onChange={onChangeEmailConfirm}
                                    />
                                </InputContainer>
                            </InputContainerWrapper>
                            
                            {/* Username & Contact */}
                            <InputContainerWrapper>
                                <InputTitle>Username</InputTitle>
                                <InputContainer>
                                    <Icon>
                                        <TbUserCircle size={"25px"} />
                                    </Icon>
                                    <Input
                                        placeholder="Username"
                                        // autoFocus
                                        name="username"
                                        onChange={onChangeUsername}
                                    />
                                </InputContainer>
                            </InputContainerWrapper>
                            <InputContainerWrapper>
                                <InputTitle>Contact</InputTitle>
                                <InputContainer>
                                    <Icon>
                                        <TbUserCircle size={"25px"} />
                                    </Icon>
                                    <Input
                                        placeholder="Contact Number"
                                        // autoFocus
                                        name="contact"
                                        onChange={onChangeContact}
                                    />
                                </InputContainer>
                            </InputContainerWrapper>

                            {/* Password */}
                            <InputContainerWrapper>
                                <InputTitle>Password</InputTitle>
                                <InputContainer>
                                    <Icon>
                                        <RiLockPasswordLine size={"25px"} />
                                    </Icon>
                                    <Input
                                        type={"password"}
                                        placeholder="Password"
                                        name="password"
                                        onChange={onChangePassword}
                                    />
                                </InputContainer>
                            </InputContainerWrapper>
                            <InputContainerWrapper>
                                <InputTitle>Confirm Password</InputTitle>
                                <InputContainer>
                                    <Icon>
                                        <RiLockPasswordLine size={"25px"} />
                                    </Icon>
                                    <Input
                                        type={"password"}
                                        placeholder="Confirm Password"
                                        name="confirmpassword"
                                        onChange={onChangePasswordConfirm}
                                    />
                                </InputContainer>
                            </InputContainerWrapper>
                            </MainInputContainer>
                            <Button onClick={handleSignUpClick}>Sign Up</Button>
                        </CardContainer>
                    </Card>
                </Container>
            </Layout>
        </>
    );
};

export default SignUp;
