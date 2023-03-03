import { createContext, FC, useState } from "react";
import { NodeProps } from "../types/CommonType";
import { UserAuthType, UserInfo, DefaultUserInfo } from "../types/UserAuth";

export const UserAuthContext = createContext<UserAuthType | null>(null);

const UserAuthProvider: FC<NodeProps> = ({ children }) => {
    const [userInfo, setUserInfo] = useState<UserInfo>(DefaultUserInfo);

    const getUserInfo = () => {
        return userInfo;
    };

    const updateUserInfo = (userInfo: UserInfo) => {
        setUserInfo(userInfo);
    };

    const handleLogin = (userInfo: UserInfo) => {
        const newUserInfo : UserInfo = {
            id: userInfo.id,
            email: userInfo.email,
            username: userInfo.username,
            token: userInfo.token,
        };
        localStorage.setItem("tpUserAuth", JSON.stringify(newUserInfo));
        updateUserInfo(newUserInfo);
    };

    const handleLogout = () => {
        console.log("logged out");
        localStorage.removeItem("tpUserAuth");
        setUserInfo(DefaultUserInfo);
        window.location.reload();
    };

    const isAuth = (): boolean => {
        if (userInfo.token) {
            return true;
        }
        return false;
    };

    return (
        <UserAuthContext.Provider
            value={{
                userInfo,
                isAuth,
                getUserInfo,
                updateUserInfo,
                handleLogin,
                handleLogout,
            }}
        >
            {children}
        </UserAuthContext.Provider>
    );
};

export default UserAuthProvider;
