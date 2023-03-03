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
} from "./ForgetPasswordElements";
import Layout from "../Layout/Layout";
import { forgetpasswordApi } from "../../services/Routes/UserApi";


const LogoImg = "logo.png";

const Login: FC = () => {
    const { userInfo, handleLogin } = useContext(UserAuthContext) as UserAuthType;
    const navigate = useNavigate();
    
    const [errorText, setErrorText] = useState("");
    const [successText, setSuccessText] = useState("");

    const [reviewEditEmail, setReviewEditEmail] = useState("");

    const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setReviewEditEmail(event.target.value);
    }

    const handleForgetPassword = async (event : any) => {
        event.preventDefault();
        const dataObject = {
            email: reviewEditEmail
        }
        await forgetpasswordApi(dataObject)
        .then((res: any) => {
            console.log(res?.data);
            if (res?.data.status === STATUS_CODES.SUCCESS_CODE){
                setSuccessText(res?.data.message)

                setTimeout(() =>{
                    setSuccessText("");
                }, 2500)
            }
            else {
                setErrorText(res?.data.message);
                setTimeout(() =>{
                    setErrorText("");
                    navigate('/signup', { replace: true });
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
                        <Title>Forgot your password?</Title>
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
                            <Button onClick={handleForgetPassword}>Forget Password</Button>
                        </CardContainer>
                    </form>
                    </Card>
                </Container>
            </Layout>
        </>
    );
}
export default Login;
