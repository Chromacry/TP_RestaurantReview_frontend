import React, { FC, useEffect, useState } from "react";
import { ResponseErrorRestaurantApiDataType, RestaurantTypes } from "../../../types/RestaurantType";
import {
    Container,
    ContentContainer,
    ContentTextWrapper,
    CardImage
} from "./CardRestaurantElements";
import Card from 'react-bootstrap/Card';
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";
import { reviewsgetbyRestaurantIDApi } from "../../../services/Routes/ReviewsApi";
import { ResponseReviewsApiDataType, ResponseReviewsApiDataType2, ResponseReviewsApiType, ResponseReviewsApiType2, ResponseReviewsData, ResponseReviewsDataList } from "../../../types/ReviewType";

const CardRestaurant: FC<RestaurantTypes> = ({restaurantName, restaurantImage, restaurantitemID, restaurantLocation}) => {
    
    const [averageRatingValue, setAverageRatingValue] = useState(5);
    const [totalReviewsValue, setTotalReviewsValue] = useState(0);

    const navigate = useNavigate();
    
    const redirectToRestaurantPage = () => {
        navigate('/restaurantdetail', { state: { restaurantitemID } , replace: true});
    }

    const reviewsApiHandler = async () => {
        const dataObject = {
            restaurantID: restaurantitemID
        }
        let totalRatings : number = 0;
        let totalReviews : number = 0;
        await reviewsgetbyRestaurantIDApi(dataObject)
            .then((res: ResponseReviewsApiType2) => {
                const resApiData: ResponseReviewsApiDataType2 = res?.data;
                // const resData: ResponseReviewsData = resApiData?.data;
                const resData : ResponseReviewsDataList[] = resApiData?.data;
                // console.log("reviews", resData);
                for (let i = 0; i < resData.length; i++) {
                    if (resData[i].timestampDeleted === null){
                        totalRatings += parseFloat(resData[i].ratings as string);
                        totalReviews += 1;
                    }
                }
                totalRatings = totalRatings / totalReviews;
                setAverageRatingValue(totalRatings);
                setTotalReviewsValue(totalReviews);
            })
            .catch((error: ResponseErrorRestaurantApiDataType) => {
                console.warn(error);
            });
    }
    useEffect(() => {
        reviewsApiHandler();
    },[])
    return (
        <>
            <Container>
                <Card className="card" onClick={redirectToRestaurantPage}>
                    <CardImage>
                        <Card.Img variant="top" src={restaurantImage || "assets/RestaurantImages/ajisen-ramen.jpg" } className="card-img-top" />
                    </CardImage>
                    <Card.Body className="content">
                        <ContentTextWrapper>
                            <Card.Title className="card-title">{restaurantName || "Restaurant Name"}</Card.Title>
                            <Card.Text className="card-text">{restaurantLocation || "Tampines Mall"}</Card.Text>
                        </ContentTextWrapper>
                        <ContentContainer>
                            <Rating name="read-only" defaultValue={5} value={(averageRatingValue === 0 ? averageRatingValue : 5)} precision={0.5} readOnly />
                            <h4>Rating: {averageRatingValue ? averageRatingValue.toFixed(1) : "5.0"}</h4>
                        </ContentContainer>
                        <ContentTextWrapper>
                        <Card.Text className="card-text">{totalReviewsValue} reviews</Card.Text>
                        </ContentTextWrapper>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default CardRestaurant;
