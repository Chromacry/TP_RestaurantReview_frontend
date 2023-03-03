export interface UserInfo {
    id: number;
    email : string,
    username: string;
    token: string;
}

export type UserAuthType = {
    userInfo: UserInfo;
    getUserInfo: () => UserInfo;
    updateUserInfo: (userInfo: UserInfo) => void;
    handleLogin: (username: any) => void;
    handleLogout: () => void;
    isAuth: () => boolean;
};

export const DefaultUserInfo: UserInfo = {
    id: 0,
    email: "",
    username: "",
    token: "",
};