import { Link } from "react-router-dom";
import styled from "styled-components";

import { Color_OrangeBrown, Color_Beige } from "../../constants/DesignConstants";
import { NodeProps } from "../../types/CommonType";

export const Container = styled.div`
    background-color: ${Color_Beige};
    color: rgb(7, 7, 7);
    padding: 50px;
`;

export const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: left;
    padding: 20px;

    h5{
        text-align: left;
        font-size: 120%;
    }
    hr{
        justify-content: center;
        text-align: center;
        width: 10%;
        border: 1px solid;
        margin-top: 20px;
        margin-bottom: 40px;
    }
`;

export const MainContent = styled.div`
    display: flex;
    flex-direction: column;

    padding: 30px;
    width: 100%;
    text-align: left;
    h2{
    margin-top: 20px;
    font-size: 150%;
    font-weight: 700;
    }

    h3{
        font-size: 125%;
    }
    
    .profile-image{
        width: 100px;
        height: 100px;
    }
`;

export const FileInput = styled.input<NodeProps>`
    // display: inline-block;
    width: 50%;
    height: 35vh;
    padding: 300px 0 0 0;
    overflow: hidden;
    // background: url('https://cdn1.iconfinder.com/data/icons/hawcons/32/698394-icon-130-cloud-upload-512.png') 'center center no-repeat #e4e4e4;
    background: url(${(props) => props.inputImage ? props.inputImage : 'https://cdn1.iconfinder.com/data/icons/hawcons/32/698394-icon-130-cloud-upload-512.png'}) center center no-repeat #e4e4e4;
    border-radius: 100%;
    background-size: 100% 100%;
    &::-webkit-file-upload-button{
        display:none;
    }
`;

export const UserContainer = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 30px;
    
    h3{
        font-size: 125%;
        padding: 10px;
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 30px;
`;

export const Title = styled.h2`
    font-weight: bold;
    font-size: 150%;
    color: #000000;
    text-align: left;
`;

