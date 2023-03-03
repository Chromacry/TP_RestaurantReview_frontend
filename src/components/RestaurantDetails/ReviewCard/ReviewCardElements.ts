import styled from "styled-components";

import { Color_OrangeBrown, Color_Beige } from "../../../constants/DesignConstants";
import { NodeProps } from "../../../types/CommonType";

export const Container = styled.div`
	// background-color: white;
	border-radius: 22px;
	display: flex;
  padding: 20px;
	gap: 20px;

`;

export const RatingContainer = styled.div`
	display: flex;
	gap: 10px;
	padding: 10px 10px 10px 0;
`;



export const ReviewImagesContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
		width: 60%;
    img {
        border-radius: 11px;
        width: 150px;
				height: 150px;
				object-fit: cover;
    }

		//* Input chage
		.inputImage {
			width: 100%;
			padding: 120px 0 0 0;
			overflow: hidden;
			border-radius: 11px;
			border: 1px solid;
			background-image: url('defaultUpload.png');
			background-size: 100% 100%;
			object-fit: cover;
			height: 100px;
			
			&::-webkit-file-upload-button{
					display:none;
			}
	}

	//* Before input change
	.image{
		border-radius: 11px;
		object-fit: cover;
		width: 100%;
		height: 100px;
	}
`;


export const Image = styled.img`
	border-radius: 100%;
	object-fit: contain;
	width: 100%;
	height: 100px;
`;
export const UserInfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	text-align: left;
	margin-bottom: 50px;
	.profile-image{
		width: 125px;
		height: 125px;
		}
	.profile-name{
		font-size: 150%;
		font-weight: bold;
	}
	.profile-location{
		font-size: 120%;
		font-weight: 500;
		padding-bottom: 20px;
	}
	.profile-reviews{
		font-size: 120%;
		font-style: italic;
	}
`;

export const UserReviewContainer = styled.div`
	width: 100%;
  padding-bottom: 20px;
	display: flex;
	flex-direction: column;
	.userRatingStars{
		font-size: 200%;
		margin-bottom: 20px;
	}

	.review-subject{
		font-size: 150%;
		font-weight: bold;
		margin-bottom: 20px;
		background-color: transparent;
	}
	.review-description{
		font-size: 120%;
		margin-bottom: 20px;
		background-color: transparent;
		border: none;
		padding: 0;
		resize: none;
		object-fit: fit;
	}

	// * Edited
	.reviewEdit-subject{
		font-size: 150%;
		font-weight: bold;
		margin-bottom: 20px;
		border: 1px solid;
		border-radius: 5px;
	}
	.reviewEdit-description{
		font-size: 120%;
		margin-bottom: 20px;
		background-color: transparent;
		padding: 0;
		border-radius: 5px;
	}
`;

export const FileInput = styled.input<NodeProps>`
    // display: inline-block;
    width: 100%;
    padding: 120px 0 0 0;
    height: 100px;
    overflow: hidden;
    background: url(${(props) => props.inputImage ? props.inputImage : 'https://cdn1.iconfinder.com/data/icons/hawcons/32/698394-icon-130-cloud-upload-512.png'}) center center no-repeat #e4e4e4;
    border-radius: 11px;
    background-size: 100% 100%;
    &::-webkit-file-upload-button{
        display:none;
    }
`;

export const ButtonContainer = styled.div`
margin-top: 20px;
display: flex;
gap: 5px;
justify-content: flex-start;
`;

export const DateFooter = styled.div`
    display: flex;
    justify-content: end;
`;

export const Title = styled.h2`
    font-weight: bold;
    font-size: 150%;
    color: #000000;
    text-align: left;
`;

