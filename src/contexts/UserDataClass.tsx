import { UserDataType, UserInfo, DefaultUserInfo } from "../types/UserData";
class UserData{
    private id : number;
    private username : string;
    private email : string;
    private profileImage : string;
    private token : string;

    constructor(initialId : number, initialUsername : string, initialEmail : string, initialProfileImage : string, intialToken : string){
        this.id = initialId;
        this.username = initialUsername;
        this.email = initialEmail;
        this.profileImage = initialProfileImage;
        this.token = intialToken;
    }

    public getToken(){
        return this.token;
    }

    public setToken(token : string){
        this.token = token;
    }
}

export default UserData;