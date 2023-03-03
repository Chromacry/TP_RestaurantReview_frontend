import { Link } from "react-router-dom";
import styled from "styled-components";

import { Color_Beige, Color_OrangeBrown } from "../../constants/DesignConstants";

const heroImagePath = './assets/OtherImages/herobowl.png';

export const Container = styled.div`
    background-color: ${Color_Beige};
    color: rgb(7, 7, 7);
`;

export const HeroSection = styled.section`
    height: 85vh;
    width: auto;
    background-image: url(${heroImagePath});
    background-size: cover;
    background-repeat: none;
    margin-bottom: 20px;
`;

export const HeroTextContainer = styled.div`
position: relative;
top: 40%;
padding-left: 50px;

h2{
    font-weight: bold;
    font-size: 200%;
    color: ${Color_OrangeBrown};
}

h4{
    padding-top: 25px;
    font-weight: 400;
    font-size: 150%;
    color: #000000;
}
`;

export const LatestReviewSection = styled.section`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
    padding: 20px;
`;

export const TopRestaurantsSection = styled.section`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 40px;
    padding: 40px;
`;

export const Title = styled.h2`
    font-weight: bold;
    font-size: 150%;
    color: #000000;
    text-align: center;
`;

