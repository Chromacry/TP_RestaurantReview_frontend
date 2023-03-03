export interface UserInfo {
    id: number;
    email : string,
    username: string;
    token: string;
}

export type UserDataType = {
    userInfo: string;
    getUserToken: () => void;
    updateUserToken: (token: string) => void;
};

export const DefaultUserInfo: UserInfo = {
    id: 0,
    email: "",
    username: "",
    token: "",
};