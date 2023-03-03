import { ReactNode } from "react";

export type NodeProps = {
    children?: ReactNode;
    reviewImage?: string;
    reviewUserImage?: string;
    reviewUsername?: string;
    reviewRatings?: number;
    
    restaurantID?: number;
    restaurantName?: string;
    restaurantImage?: string;
    restaurantDescription?: string;
    profileImage?: string;
    userLoggedIn?: boolean;
    inputImage?: string;
};

export interface DataValues {
    token?: string;
}
