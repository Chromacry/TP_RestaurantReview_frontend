import { Link } from "react-router-dom";
import styled from "styled-components";

import { Color_OrangeBrown, Color_Beige } from "../../constants/DesignConstants";

export const Container = styled.div`
    background-color: ${Color_Beige};
    color: rgb(7, 7, 7);
    height:100vh;
`;

export const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;

    h5{
        text-align: center;
        font-size: 120%;
    }
    hr{
        justify-content: center;
        text-align: center;
        width: 10%;
        border: 1px solid;
        margin-top: 20px;
        margin-bottom: 40px;
    }
`;

export const MainContent = styled.div`
    // margin-bottom: 30px;
    padding: 30px;
    width: 100%;
    text-align: left;

    h2{
    margin-top: 20px;
    font-size: 150%;
    font-weight: 700;
    }
`;

export const Title = styled.h2`
    font-weight: bold;
    font-size: 150%;
    color: #000000;
    text-align: center;
`;

