import React, { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import { NodeProps } from "../../types/CommonType";

import { searchApi } from "../../services/Routes/ExtrasApi";
import { restaurantApi } from "../../services/Routes/RestaurantsApi";
import { ResponseRestaurantApiType, ResponseRestaurantApiDataType, ResponseRestaurantData, ResponseErrorRestaurantApiDataType } from "../../types/RestaurantType";

import {
    Container,
    TitleContainer,
    RestaurantsSection,
    Title,
    SearchContainer
} from "./RestaurantsElements";
import Layout from "../Layout/Layout";
import CardRestaurant from "../Shared/CardRestaurant/CardRestaurant";
import TextField from "@mui/material/TextField/TextField";
import SearchIcon from '@mui/icons-material/Search';
import Button from "@mui/material/Button";



const Restaurants: FC<NodeProps> = () => {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [restaurantsOriginalObject, setRestaurantsOriginalObject] = useState(Object);
    const [restaurantsObject, setRestaurantsObject] = useState(Object); // * Object for iteration

    const restaurantApiHandler = async () =>{
        await restaurantApi()
        .then((res : ResponseRestaurantApiType)=> {
            const resApiData : ResponseRestaurantApiDataType = res?.data;
            const resData : ResponseRestaurantData = resApiData?.data;
            setRestaurantsObject(resData);
            setRestaurantsOriginalObject(resData);
            setDataLoaded(true);
        })
        .catch((error : ResponseErrorRestaurantApiDataType) =>{
            console.warn(error);
        });
    }

    const restaurantSearchApiHandler = async (event: ChangeEvent<HTMLInputElement>) => {
        const dataObject = {
            data: restaurantsOriginalObject,
            keys: ["restaurantName"],
            query: event.target.value
        }
        console.log(dataObject);
        await searchApi(dataObject)
        .then((res : ResponseRestaurantApiType) =>{
            const resApiData : ResponseRestaurantApiDataType = res?.data;
            const resData : ResponseRestaurantData = resApiData?.data;
            console.log(resData);
            setRestaurantsObject(resData);
        }).catch((error) =>{
            console.error(error);
        });
            
    }

    const renderAllRestaurants = () => {
        // console.log(dataLoaded);
        // console.log(restaurantsObject);
        let restaurantsComponents : any = [];
        if(dataLoaded && restaurantsObject){
            for (let i = 0; i < restaurantsObject.length; i++) {
                let restaurantsObjectData : ResponseRestaurantData  = restaurantsObject as ResponseRestaurantData;
                restaurantsComponents.push(
                <CardRestaurant key={restaurantsObjectData[i].id}
                restaurantitemID={restaurantsObjectData[i].id}
                restaurantName={restaurantsObjectData[i].restaurantName}
                restaurantImage={restaurantsObjectData[i].restaurantLogo}
                // restaurantLocation={restaurantsObjectData[i].location}
                />);
            }
        }
        return restaurantsComponents;
    }

    useEffect(() =>{
        restaurantApiHandler();
    }, []);
    
    return (
        <>
            <Layout>
                <Container>
                    <TitleContainer>
                        <Title>Restaurants</Title>
                        <h5>Heavenly Eats, Decide your next meal.</h5>
                        <hr></hr>
                    </TitleContainer>
                    <SearchContainer>
                        <TextField onChange={restaurantSearchApiHandler} id="outlined-basic" label="Search" variant="outlined" className="searchBarInput" />
                        <Button className="searchBtn"><SearchIcon /></Button>
                    </SearchContainer>
                    <RestaurantsSection>{renderAllRestaurants()}</RestaurantsSection>
                </Container>
            </Layout>
        </>
    );
};

export default Restaurants;