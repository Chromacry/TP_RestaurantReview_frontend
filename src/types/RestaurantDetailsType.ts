export type RestaurantDetailsProps = {
    category?: string;
    contact?: string;
    location?: string;
};

export type ResponseRestaurantDetailsApiType = {
    // headers: ResponseRestaurantApiHeaderType;
    status: number;
    data: ResponseRestaurantDetailsApiDataType;
}

// * Restaurant Details
export type ResponseRestaurantDetailsApiDataType = {
    message: string;
    status: number;
    data: ResponseRestaurantDetailsData;
}

export interface ResponseRestaurantDetailsData {
    [index: string]: {
        id?: string;
        category?: string;
        contact?: string;
        location?: string;
        openHours?: string;
        restaurantLogo?: string;
        restaurantName?: string;
        restaurantDescription?: string;
    }
}

// * Reviews
// export type ResponseReviewsApiDataType = {
//     message: string;
//     status: number;
//     data: ResponseRestaurantDetailsData;
// }

// export interface ResponseReviewsData {
//     [index: string]: {
//         id?: string;
//         username?:string;
//         ratings?: string;
//         reviewSubject?: string;
//         reviewBody?: string;
//         reviewImage?: string;
//         timestampCreated?:string;
//         timestampUpdated?:string;
//         timestampDeleted?:string;


//     }
// }

