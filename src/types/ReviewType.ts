

export type ReviewProps = {
    reviewID?: string;
    userName?: string;
    userImage?: string;
    userLocation?: string;
    reviewSubject?: string;
    reviewDescription?: string;
    reviewImage?: [string, string, string, string, string];
    reviewRating?: number;
    reviewTotalRating?: number;
    reviewCreatedDate?: string;

};

export type ResponseReviewsApiType = {
    // headers: ResponseRestaurantApiHeaderType;
    status: number;
    data: ResponseReviewsApiDataType;
}

export type ResponseReviewErrorApiType = {
    message: string;
    status: number;
}
export type ResponseReviewsApiDataType = {
    message: string;
    status: number;
    data: ResponseReviewsData;
}

export type ResponseReviewsApiType2 = {
    // headers: ResponseRestaurantApiHeaderType;
    status: number;
    data: ResponseReviewsApiDataType2;
}

export type ResponseReviewsApiDataType2 = {
    message: string;
    status: number;
    data: ResponseReviewsDataList[];
}

export interface ResponseReviewsData {
    [index: string]: {
        id?: string;
        location?: string;
        reviewImage1?: string;
        reviewImage2?: string;
        reviewImage3?: string;
        reviewImage4?: string;
        reviewImage5?: string;
        username?: string;
        profileImage?: string;
        ratings?: string;
        reviewBody?: string;
        reviewSubject?: string;
        timestampCreated?: string;
        timestampDeleted?: string;
    }
}

export interface ResponseReviewsDataList {
    id?: string;
    location?: string;
    reviewImage?: string;
    username?: string;
    profileImage?: string;
    ratings?: string;
    reviewBody?: string;
    reviewSubject?: string;
    timestampCreated?: string;
    timestampDeleted?: string;
}