import { createContext, FC, useState } from "react";
import { NodeProps } from "../types/CommonType";
import { UserDataType, UserInfo, DefaultUserInfo } from "../types/UserData";

export const UserDataContext = createContext<UserDataType | null>(null);

const UserAuthProvider: FC<NodeProps> = ({ children }) => {
    const [userInfo, setUserInfo] = useState("");

    const getUserToken = () => {
        return userInfo;
    };

    const updateUserToken = (token: string) => {
        setUserInfo(token);
    };

    return (
        <UserDataContext.Provider
            value={{
                userInfo,
                getUserToken,
                updateUserToken,
            }}
        >
            {children}
        </UserDataContext.Provider>
    );
};

export default UserAuthProvider;