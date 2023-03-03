import React, { FC, useEffect, useState } from "react";
import {
    CardImage,
    Container
} from "./CardDisplayElements";
import Card from 'react-bootstrap/Card';
import { NodeProps } from "../../../types/CommonType";
import { useNavigate } from "react-router-dom";


const CardDisplay: FC<NodeProps> = ({restaurantID, restaurantName, restaurantImage, restaurantDescription}) => {
    const navigate = useNavigate();
    
    const redirectToRestaurantPage = () => {
        navigate('/restaurantdetail', { state: { restaurantitemID: restaurantID } , replace: true});
    }
    
    return (
        <>
            <Container>
            <Card className="card" onClick={redirectToRestaurantPage}>
                <CardImage>
                <Card.Img variant="top" src={restaurantImage ||"assets/RestaurantImages/ajisen-ramen.jpg"} className="card-img-top" />
                </CardImage>
                <Card.Body className="content">
                <Card.Title className="card-title">{restaurantName || "-"}</Card.Title>
                <Card.Text className="card-text">{restaurantDescription ||"-"}</Card.Text>
                </Card.Body>
            </Card>
            </Container>
        </>
    );
};

export default CardDisplay;
