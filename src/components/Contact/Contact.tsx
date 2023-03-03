import { ChangeEvent, FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
    Container,
    TitleContainer,
    RatingContainer,
    InformationSection,
    ReviewSection,
    RestaurantImagesContainer,
    DescriptionContainer,
    InformationDetailsContainer,
    Title,
    Image,
    ReviewTitleContainer,
    FileInputContainer,
    FileInput,
} from "./ContactElements";
import Layout from "../Layout/Layout";
import Map from "../Shared/Map/Map";
import Rating from '@mui/material/Rating';
import ReviewCard from "../RestaurantDetails/ReviewCard/ReviewCard";
import Button from "@mui/material/Button";
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import { STATUS_CODES } from "../../constants/GlobalConstants";
import Alert from "@mui/material/Alert";
import { NodeProps } from "../../types/CommonType";

const Contact: FC<NodeProps> = ({ }) => {
    const navigate = useNavigate();
    const location = useLocation();
    
    return (
        <>
            <Layout>
                <Container>
                    <TitleContainer>
                        <Title>Contact</Title>
                        <h5>Heavenly Eats, Decide your next meal.</h5>
                        <hr></hr>
                    </TitleContainer>
                    Contact us at Temasek Polytechnic
                </Container>
            </Layout>
        </>
    );
};

export default Contact;
