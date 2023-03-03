import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import { TbUserCircle } from "react-icons/tb";
import { RiLockPasswordLine } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import { STATUS_CODES } from "../../constants/GlobalConstants";

import {
    Container,
    Card,
    InputContainer,
    Icon,
    Input,
    Button,
    ErrorText,
    Title,
    InputTitle,
    Image,
    CardContainer,
    SuccessText,
} from "./ChangePasswordElements";
import Layout from "../Layout/Layout";
import { updateUserApi } from "../../services/Routes/UserApi";


const LogoImg = "logo.png";

const Login: FC = () => {
    const navigate = useNavigate();
    
    const [errorText, setErrorText] = useState("");
    const [successText, setSuccessText] = useState("");

    const [reviewEditOldPassword, setReviewEditOldPassword] = useState("");
    const [reviewEditPassword, setReviewEditPassword] = useState("");
    const onChangeOldPassword = (event: ChangeEvent<HTMLInputElement>) => {
        setReviewEditOldPassword(event.target.value);
    }
    const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setReviewEditPassword(event.target.value);
    }

    const handleChangePassword = async (event : any) => {
        event.preventDefault();
        if (!reviewEditOldPassword|| !reviewEditPassword){
            setErrorText("Passwords can't be empty!");

            setTimeout(() => {
                setErrorText("");
            }, 2500);
            return;
        }

        const userAuth = localStorage.getItem("tpUserAuth");
        let token,userID;
        if (userAuth) {
            token = JSON.parse(userAuth).token;
            userID = JSON.parse(userAuth).id;
        }
        const dataObject = {
            token: token,
            id: userID,
            password: reviewEditPassword
        }
        await updateUserApi(dataObject)
        .then((res: any) => {
            const resApiData = res?.data;
            console.log(resApiData);
            if (resApiData.status === STATUS_CODES.SUCCESS_CODE) {
                // console.log(resApiData.message);
                setSuccessText("Password updated successfully!");
                setTimeout(()=>{
                    setSuccessText("");
                    navigate("/settings", {replace: true});
                }, 2500);
            }
            else{
                setErrorText(resApiData.message);
                setTimeout(()=>{
                    setErrorText("");
                }, 2500)

            }
        })
        .catch((error: any) => {
            console.error(error);
        })

    }

    return (
        <>
            <Layout>
                <Container>
                    <Card>
                        <form>
                        <CardContainer>
                        <Image src={LogoImg} alt="logo" />
                        <Title>Change Password</Title>
                        <SuccessText>{successText}</SuccessText>
                        <ErrorText>{errorText}</ErrorText>
                            <InputTitle>Current Password</InputTitle>
                            <InputContainer>
                                <Icon>
                                    <RiLockPasswordLine size={"25px"} />
                                </Icon>
                                <Input
                                    placeholder="Current Password"
                                    // autoFocus
                                    name="password"
                                    value={reviewEditOldPassword}
                                    onChange={onChangeOldPassword}
                                />
                            </InputContainer>
                            <InputTitle>New Password</InputTitle>
                            <InputContainer>
                                <Icon>
                                    <RiLockPasswordLine size={"25px"} />
                                </Icon>
                                <Input
                                    placeholder="New Password"
                                    // autoFocus
                                    name="password"
                                    value={reviewEditPassword}
                                    onChange={onChangePassword}
                                />
                            </InputContainer>
                            <Button onClick={handleChangePassword}>Change Password</Button>
                        </CardContainer>
                    </form>
                    </Card>
                </Container>
            </Layout>
        </>
    );
}
export default Login;
