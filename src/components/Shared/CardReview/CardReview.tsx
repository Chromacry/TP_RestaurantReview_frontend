import React, { FC, useEffect, useState } from "react";
import { NodeProps } from "../../../types/CommonType";
import {
    Container,
    ProfileWrapper,
    ContentContainer,
    ContentTextWrapper
} from "./CardReviewElements";
import Card from 'react-bootstrap/Card';
import Rating from "@mui/material/Rating";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";

const CardReview: FC<NodeProps> = ({restaurantID, restaurantName, reviewImage,  reviewUserImage, reviewUsername, reviewRatings}) => {
    const navigate = useNavigate();
    
    const redirectToRestaurantPage = () => {
        navigate('/restaurantdetail', { state: { restaurantitemID: restaurantID } , replace: true});
    }
    
    return (
        <>
            <Container>
                <Card className="card" onClick={redirectToRestaurantPage}>
                    <Card.Img variant="top" src={reviewImage || "assets/RestaurantImages/ajisen-ramen.jpg" }className="card-img" />
                    <Card.Body className="content">
                        <ContentContainer>
                            <ProfileWrapper>
                                <Avatar alt={reviewUsername || ""} src={reviewUserImage || "/static/images/avatar/1.jpg"} className="profile-image" />
                            </ProfileWrapper>
                            <ContentTextWrapper>
                                <Card.Title className="card-title">{restaurantName || "-"}</Card.Title>
                                <Card.Text className="card-text">{"By " + reviewUsername || "By -"}</Card.Text>
                                <Rating name="read-only" defaultValue={5} value={(reviewRatings === 0 ? 5 : reviewRatings)} precision={0.5} readOnly />
                            </ContentTextWrapper>
                        </ContentContainer>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default CardReview;
