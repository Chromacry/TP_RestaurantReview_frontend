import { Link } from "react-router-dom";
import styled from "styled-components";

import { Color_OrangeBrown, Color_Beige } from "../../constants/DesignConstants";
import { NodeProps } from "../../types/CommonType";

export const Container = styled.div`
    background-color: ${Color_Beige};
    color: rgb(7, 7, 7);
    padding: 10px 40px;
    hr{
        border: 1px solid;
        width: 100%;
    }
`;

export const ReviewTitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
`;

export const ReviewSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 10px 0 10px 0;
    // margin: 0 auto;
    .modalFrame{
    background-color: ${Color_Beige};
    position: absolute as absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    border: 2px solid #000;
    boxShadow: 24;
    }
    .modal-footer{
        justify-content: flex-end;
    }
`;

export const FileInputContainer = styled.div`
    display: flex;
    gap: 20px;
`;

export const FileInput = styled.input<NodeProps>`
    // display: inline-block;
    width: 100%;
    padding: 120px 0 0 0;
    height: 100px;
    overflow: hidden;
    // background: url('https://cdn1.iconfinder.com/data/icons/hawcons/32/698394-icon-130-cloud-upload-512.png') 'center center no-repeat #e4e4e4;
    background: url(${(props) => props.inputImage ? props.inputImage : 'https://cdn1.iconfinder.com/data/icons/hawcons/32/698394-icon-130-cloud-upload-512.png'}) center center no-repeat #e4e4e4;
    border-radius: 11px;
    background-size: 100% 100%;
    &::-webkit-file-upload-button{
        display:none;
    }
`;

export const Image = styled.img`
    width: auto;
    height: 100px;
`;

export const RatingContainer = styled.div`
    display: flex;
    gap: 10px;
    padding: 10px 10px 10px 0;
`;

export const RestaurantImagesContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    
    img {
        border: 1px solid;
        width: 50%;
        height: auto;
    }
`;

export const TitleContainer = styled.div`
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: left;
    
    h5{
        font-size: 120%;
    }
    hr{
        justify-content: center;
        width: 10%;
        border: 1px solid;
        margin-top: 20px;
        margin-bottom: 40px;
    }
`;

export const DescriptionContainer = styled.div`
    padding-top: 20px;
    padding-bottom: 20px;
`;

export const InformationSection = styled.section`
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    gap: 50px;
`;

export const InformationDetailsContainer = styled.div`
    h3{
        font-size: 150%;
        font-weight: 500;
        margin-bottom: 20px;
    }
    h4{
        font-size: 110%;
        font-weight: 500;
    }
    p{
        margin-bottom: 20px;
    }
`;

export const Title = styled.h2`
    font-weight: bold;
    font-size: 150%;
    color: #000000;
    text-align: left;
`;

