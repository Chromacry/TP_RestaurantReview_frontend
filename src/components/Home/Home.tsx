import { FC, useContext, useEffect, useState } from "react";
import { NodeProps } from "../../types/CommonType";
import { ResponseErrorHomeApiDataType, ResponseLatestReviewApiDataType, ResponseLatestReviewApiType, ResponseLatestReviewData, ResponseTopRestaurantApiDataType, ResponseTopRestaurantApiType, ResponseTopRestaurantData } from "../../types/HomeType";
import { restaurantgetTop4Api } from "../../services/Routes/RestaurantsApi";
import { reviewsgetLatestReviewApi } from "../../services/Routes/ReviewsApi";

import {
    Container,
    HeroSection,
    LatestReviewSection,
    HeroTextContainer,
    TopRestaurantsSection,
    Title
} from "./HomeElements";
import Layout from "../Layout/Layout";
import CardReview from "../Shared/CardReview/CardReview";
import CardDisplay from "../Shared/CardDisplay/CardDisplay";

const Home: FC<NodeProps> = () => {
    const [topRestaurantList, setTopRestaurantList] = useState(Object);
    
    const [latestReviewList, setLatestReviewList] = useState<ResponseLatestReviewData[]>();
    
    const [dataLoadedRestaurant, setDataLoadedRestaurant] = useState(false);
    const [dataLoadedReview, setDataLoadedReview] = useState(false);

    const getLatestReviews = async () => {
        await reviewsgetLatestReviewApi()
            .then((res: ResponseLatestReviewApiType) => {
                const resApiData: ResponseLatestReviewApiDataType = res?.data;
                const resData: ResponseLatestReviewData[] = resApiData?.data;
                // console.log(resData);
                setLatestReviewList(resData);
                setDataLoadedReview(true);
            })
            .catch((error: ResponseErrorHomeApiDataType) => {
                console.error(error);
            });
    }

    const getTopRestaurants = async () => {
        await restaurantgetTop4Api()
        .then((res: ResponseTopRestaurantApiType) => {
            const resApiData : ResponseTopRestaurantApiDataType = res?.data;
            const resData : ResponseTopRestaurantData[] = resApiData?.data;
            // console.log(resData);
            setTopRestaurantList(resData);
            setDataLoadedRestaurant(true);
        })
        .catch((error: ResponseErrorHomeApiDataType) => console.error(error))
    }

    useEffect(()=> {
        getTopRestaurants();
        getLatestReviews();
    },[])
    const renderLatestReviews = () => {
        if (!latestReviewList && !dataLoadedReview) return;
        getLatestReviews();
        if(dataLoadedReview && latestReviewList){
            return (
            latestReviewList.map((review: ResponseLatestReviewData) => {
                return (
                    <CardReview key={review.id}
                    restaurantID={review.restaurantid}
                    restaurantName={review.restaurantName}
                    reviewImage={review.restaurantLogo}
                    reviewUserImage={review.profileImage}
                    reviewUsername={review.username}
                    reviewRatings={review.ratings}
                    />);
        }));
        };
    }

    const renderTopRestaurants = () => {
        if (!topRestaurantList && !dataLoadedRestaurant) return;
        if(dataLoadedRestaurant && topRestaurantList){
            return (
            topRestaurantList.map((restaurant: ResponseTopRestaurantData) => {
                return (
                <CardDisplay key={restaurant.restaurantID}
                restaurantID={restaurant.restaurantID}
                restaurantName={restaurant.restaurantName}
                restaurantImage={restaurant.restaurantImage}
                restaurantDescription={restaurant.restaurantDescription}
                />);
            }));
        };
    };
    return (
        <>
            <Layout>
                <Container>
                    <HeroSection>
                        <HeroTextContainer>
                            <h2>Looking for a place<br/>to eat?</h2>
                            <h4>We provide ratings for you to choose!</h4>
                        </HeroTextContainer>
                    </HeroSection>
                    <Title>Latest Reviews</Title>
                    <LatestReviewSection>
                        {renderLatestReviews()}
                    </LatestReviewSection>
                    <Title>Top Restaurants</Title>
                    <TopRestaurantsSection>
                        {renderTopRestaurants()}
                    </TopRestaurantsSection>
                </Container>
            </Layout>
        </>
    );
};

export default Home;
