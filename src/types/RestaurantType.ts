export type RestaurantTypes = {
    restaurantImage?: string;
    restaurantName?: string;
    restaurantRating?: string;
    restaurantLocation?: string;
    restaurantitemID?: number;
};

export type ResponseRestaurantApiType = {
    // headers: ResponseRestaurantApiHeaderType;
    status: number;
    data: ResponseRestaurantApiDataType;
}

export type ResponseRestaurantApiDataType = {
    message: string;
    status: number;
    data: ResponseRestaurantData;
}

export type ResponseErrorRestaurantApiDataType = {
    message: string;
    status: number;
}

export type ResponseRestaurantApiHeaderType = {
    // contentType: string;
    accessToken: string;
    
}

export interface ResponseRestaurantData {
    [index: string]: {
        id?: number;
        category?: string;
        contact?: string;
        location: string;
        openHours: string;
        restaurantLogo: string;
        restaurantName: string;
    }
}