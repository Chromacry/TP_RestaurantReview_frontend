import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import { UserAuthContext } from "../../contexts/UserAuthContext";
import { UserAuthType, UserInfo } from "../../types/UserAuth";
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
} from "./ResetPasswordElements";
import Layout from "../Layout/Layout";
import { resetpasswordApi } from "../../services/Routes/UserApi";


const LogoImg = "logo.png";

const Login: FC = () => {
    const token = new URLSearchParams(document.location.search).get('token');
    const navigate = useNavigate();
    
    const [errorText, setErrorText] = useState("");
    const [successText, setSuccessText] = useState("");

    const [reviewEditEmail, setReviewEditEmail] = useState("");
    const [reviewEditPassword, setReviewEditPassword] = useState("");

    console.log(token);
    const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setReviewEditEmail(event.target.value);
    }
    const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setReviewEditPassword(event.target.value);
    }

    const handleResetPassword = async (event : any) => {
        event.preventDefault();
        const dataObject = {
            token: token,
            email: reviewEditEmail,
            password: reviewEditPassword
        }
        await resetpasswordApi(dataObject)
        .then((res: any) => {
            const resApiData = res?.data;
            console.log(resApiData);
            if (resApiData.status === STATUS_CODES.SUCCESS_CODE) {
                setSuccessText(resApiData.message);
                setTimeout(()=>{
                    setSuccessText("");
                    navigate("/login", {replace: true});
                }, 2500);
            }
            else{
                setErrorText(resApiData.message);
                setTimeout(()=>{
                    setErrorText("");
                    navigate("/forgetpassword", {replace: true});
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
                        <Title>Welcome Back!</Title>
                        <SuccessText>{successText}</SuccessText>
                        <ErrorText>{errorText}</ErrorText>
                            <InputTitle>Email</InputTitle>
                            <InputContainer>
                                <Icon>
                                    <TbUserCircle size={"25px"} />
                                </Icon>
                                <Input
                                    placeholder="Email Address"
                                    // autoFocus
                                    name="email"
                                    value={reviewEditEmail}
                                    onChange={onChangeEmail}
                                />
                            </InputContainer>
                            <InputTitle>New Password</InputTitle>
                            <InputContainer>
                                <Icon>
                                    <TbUserCircle size={"25px"} />
                                </Icon>
                                <Input
                                    placeholder="New Password"
                                    // autoFocus
                                    name="password"
                                    value={reviewEditPassword}
                                    onChange={onChangePassword}
                                />
                            </InputContainer>
                            <Button onClick={handleResetPassword}>Reset Password</Button>
                        </CardContainer>
                    </form>
                    </Card>
                </Container>
            </Layout>
        </>
    );
}
export default Login;
