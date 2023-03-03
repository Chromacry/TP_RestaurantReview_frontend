export type SettingsType = {
    userImage?: string;
    email?: string;
    username?: string;
    password?: string;
    createdAt?: string;
}

export type ResponseTopRestaurantApiType = {
    // headers: ResponseRestaurantApiHeaderType;
    status: number;
    data: ResponseTopRestaurantApiDataType;
}

export type ResponseLatestReviewApiType = {
    // headers: ResponseRestaurantApiHeaderType;
    status: number;
    data: ResponseLatestReviewApiDataType;
}


export type ResponseTopRestaurantApiDataType = {
    message: string;
    status: number;
    data: ResponseTopRestaurantData[];
}

export type ResponseLatestReviewApiDataType = {
    message: string;
    status: number;
    data: ResponseLatestReviewData[];
}

export type ResponseErrorHomeApiDataType = {
    message: string;
    status: number;
}

export interface ResponseTopRestaurantData {
        restaurantID?: number;
        restaurantName?: string;
        restaurantLogo?: string;
        restaurantImage?: string;
        restaurantDescription: string;
        numRatings: number;
        averageRating: number;
}

export interface ResponseLatestReviewData {
    id?: number;
    restaurantid?: number;
    ratings?: number;
    username?: string;
    profileImage?: string;
    restaurantName: string;
    restaurantLogo: string;
}