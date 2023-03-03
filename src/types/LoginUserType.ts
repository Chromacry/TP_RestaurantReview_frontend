export interface LoginUserValues {
    email?: string;
    password?: string;
}

export interface LoginFormprops {
    initialEmail?: string;
    initialPassword?: string;
}

export type ResponseLoginApiType = {
    status: number;
    data: ResponseLoginApiDataType;
}

export type ResponseLoginApiDataType = {
    message: string;
    status: number;
    data: ResponseLoginData;
}

export interface ResponseLoginData {
    [index: string]: {
        id?: number;
        profileImage?: Blob;
        username: string;
        emailaddress: string;
    
    }
}