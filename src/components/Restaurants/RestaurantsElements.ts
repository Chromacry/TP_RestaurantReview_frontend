import styled from "styled-components";

import { Color_Beige } from "../../constants/DesignConstants";

export const Container = styled.div`
background-color: ${Color_Beige};
    color: rgb(7, 7, 7);
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

export const SearchContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    .searchBtn{
        background-color: #fff;
        border: 1px solid;
        border-color: #000;
        margin-left: 10px;
        height: 100%;
    }
`;


export const RestaurantsSection = styled.section`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    // grid-gap: 40px;
    padding:  10px 50px
`;

export const Title = styled.h2`
    font-weight: bold;
    font-size: 150%;
    color: #000000;
    text-align: center;
`;

