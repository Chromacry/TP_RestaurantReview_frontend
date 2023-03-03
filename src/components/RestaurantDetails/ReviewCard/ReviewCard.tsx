import React, { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { ResponseReviewsApiType, ResponseReviewErrorApiType, ResponseReviewsApiDataType, ReviewProps } from "../../../types/ReviewType";
import { reviewsdeletebyIDApi, reviewsupdatebyIDApi } from "../../../services/Routes/ReviewsApi";
import {
    Container,
    UserInfoContainer,
    DateFooter,
    Image,
    RatingContainer,
    ReviewImagesContainer,
    UserReviewContainer,
    Title,
    ButtonContainer,
    FileInput,
} from "./ReviewCardElements";
import Rating from '@mui/material/Rating';
import Avatar from "@mui/material/Avatar";
import { styled, alpha } from '@mui/material/styles';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Button } from "flowbite-react/lib/esm/components/Button/Button";
import ButtonMUI from "@mui/material/Button"
import ReportIcon from '@mui/icons-material/Report';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from "@mui/material/Snackbar/Snackbar";
import IconButton from "@mui/material/IconButton/IconButton";
import { checkTokenApi } from "../../../services/Routes/UserApi";
import { STATUS_CODES } from "../../../constants/GlobalConstants";


const ReviewCard: FC<ReviewProps> = ({reviewID, userName, userImage, userLocation, reviewSubject, reviewDescription, reviewRating, reviewTotalRating, reviewCreatedDate, reviewImage}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const itemID = location.state.restaurantitemID;
    const [currentUser, setCurrentUser] = useState("");
    
    const reviewImageList : [string, string, string, string, string] = reviewImage || ["","","","",""];
    const [reviewEditRating, setReviewEditRating] = useState(reviewRating);
    const [reviewEditSubject, setReviewEditSubject] = useState(reviewSubject);
    const [reviewEditBody, setReviewEditBody] = useState(reviewDescription);
    
    const [reviewEditImage1, setreviewEditImage1] = useState(reviewImageList[0]);
    const [reviewEditImage2, setreviewEditImage2] = useState(reviewImageList[1]);
    const [reviewEditImage3, setreviewEditImage3] = useState(reviewImageList[2]);
    const [reviewEditImage4, setreviewEditImage4] = useState(reviewImageList[3]);
    const [reviewEditImage5, setreviewEditImage5] = useState(reviewImageList[4]);

    const [reportAlert, setReportAlert] = useState(false);
    const [reportAlertText, setReportAlertText] = useState("");

    const [isUserReview, setIsUserReview] = useState(false);
    const [reviewEditing, setReviewEditing] = useState(false);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const SGoffset = 8;
    const SGTime = new Date(reviewCreatedDate || "");
    const reviewDateCreated = moment.utc(reviewCreatedDate).format("DD MMM YYYY"); //
    const reviewTimeCreated = moment(SGTime.setTime(SGTime.getTime() + SGoffset * 60 * 60 * 1000)).format("hh:mm:ss A");
    
    const fileToBase64 = (file : File) => new Promise((resolve, reject) => {
        if (!file) return;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const handleChangeImg1 = async (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        setreviewEditImage1(await fileToBase64(event.target.files[0]) as string);
    }
    const handleChangeImg2 = async (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        setreviewEditImage2(await fileToBase64(event.target.files[0]) as string);
    }
    const handleChangeImg3 = async (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        setreviewEditImage3(await fileToBase64(event.target.files[0]) as string);
    }
    const handleChangeImg4 = async (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        setreviewEditImage4(await fileToBase64(event.target.files[0]) as string);
    }
    const handleChangeImg5 = async (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        setreviewEditImage5(await fileToBase64(event.target.files[0]) as string);
    }


    useEffect(() => {
        checkCurrentUserReview();
    }, []);

    const checkCurrentUserReview = () => {
        const currentUserData = JSON.parse(localStorage.getItem('tpUserAuth') as string);
        if (!currentUserData) return;
        const currentUser = currentUserData.username;
        setCurrentUser(currentUser);
        if (userName === currentUser) setIsUserReview(true);
    };

    // * Alert for reporting
    const handleCloseReport = () => {
        setReportAlert(false);
        setReportAlertText("");
    };
    const handleActionReport = (
        <>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCloseReport}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </>
    );

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };  
    const handleEditReviewClose = () => {
        setAnchorEl(null);
        setReviewEditing(false);
        // * Reset edit to back to original state
        setReviewEditRating(reviewRating);
        setReviewEditBody(reviewDescription);
        setReviewEditSubject(reviewSubject);
    };
    const StyledMenu = styled((props: MenuProps) => (
        <Menu
            elevation={0}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            {...props}
        />
    ))(({ theme }) => ({
        '& .MuiPaper-root': {
            borderRadius: 6,
            marginTop: theme.spacing(1),
            minWidth: 180,
            color:
                theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
            boxShadow:
                'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
            '& .MuiMenu-list': {
                padding: '4px 0',
            },
            '& .MuiMenuItem-root': {
                '& .MuiSvgIcon-root': {
                    fontSize: 18,
                    color: theme.palette.text.secondary,
                    marginRight: theme.spacing(1.5),
                },
                '&:active': {
                    backgroundColor: alpha(
                        theme.palette.primary.main,
                        theme.palette.action.selectedOpacity,
                    ),
                },
            },
        },
    }));

    const onChangeSubject = (event: ChangeEvent<HTMLInputElement>) => {
        setReviewEditSubject(event.target.value);
    }

    const onChangeBody = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setReviewEditBody(event.target.value);
    }

    const onChangeRating = (event: ChangeEvent<unknown>, newValue: number | any) => {
        setReviewEditRating(newValue);
    }

    const handleReviewEditSave = async () => {
        console.log(reviewID);
        const dataObject = {
            // accountID: JSON.parse(localStorage.getItem('tpUserAuth') as string).id,
            id: reviewID,
            ratings: reviewEditRating,
            reviewSubject: reviewEditSubject,
            reviewBody: reviewEditBody,
            reviewImage1: reviewEditImage1,
            reviewImage2: reviewEditImage2,
            reviewImage3: reviewEditImage3,
            reviewImage4: reviewEditImage4,
            reviewImage5: reviewEditImage5,
            token: JSON.parse(localStorage.getItem('tpUserAuth') as string).token,
        }
        await reviewsupdatebyIDApi(dataObject)
            .then((res: ResponseReviewsApiType) => {
                const resApiData: ResponseReviewsApiDataType = res?.data;
                if (resApiData.status !== STATUS_CODES.SUCCESS_CODE){
                    setReviewEditing(false);
                    setReportAlertText("Please login and try again.");
                    setReportAlert(true);
                    
                    setTimeout(() => {
                        // window.location.reload();
                    }, 3500)
                    return;
                }
                setReportAlertText("Successfully edited review.");
                setReportAlert(true);
                
                setTimeout(() => {
                    window.location.reload();
                }, 3500)
            })
            .catch((error: ResponseReviewErrorApiType) => {
                console.warn(error);
            });
        // TODO: Call update api and put in all inputs and id of review.
    }
    const handleReviewEdit = () => {
        setReviewEditing(false); // * Not sure if this put here need anot
        setAnchorEl(null);
        // TODO: Change it to editable for comment.
        console.log(reviewID); // * ReviewID
        setReviewEditing(true);
    }
    const handleReviewDelete = async () => {
        setAnchorEl(null);
        const response = window.confirm("Are you sure you want to delete this review?");
        if (!response) return;
        // TODO: Call Delete API and put in review ID
        console.log(JSON.parse(localStorage.getItem('tpUserAuth') as string).token);
        const dataObject = {
            data: {
                id: reviewID,
                token: JSON.parse(localStorage.getItem('tpUserAuth') as string).token
            }
        }
        await reviewsdeletebyIDApi(dataObject)
            .then((res: ResponseReviewsApiType) => {
                const resApiData: ResponseReviewsApiDataType = res?.data;
                console.log(resApiData);
                if (resApiData.status !== STATUS_CODES.SUCCESS_CODE){
                    console.log(resApiData);
                    setReviewEditing(false);
                    setReportAlertText("Please login and try again.");
                    setReportAlert(true);
                    
                    setTimeout(() => {
                        window.location.reload();
                    }, 3500);
                    return;
                }
                setReportAlertText("Successfully deleted review.");
                setReportAlert(true);

                setTimeout(() => {
                    window.location.reload();
                }, 3500)
            })
            .catch((error: ResponseReviewErrorApiType) => {
                console.warn(error);
            });
    }
    const handleReviewReport = () => {
        setAnchorEl(null);
        setReportAlert(true);
        setReportAlertText("User reported! Thanks for reporting.");
    }

    const renderReviewImages = () => {
        // TODO: Render images on review card
        return (
            reviewImage && reviewImage?.map((value, index) => {
                if (value === "") return;
                return (
                    <img src={value} alt="" key={index} />
                )
            })
        );
    }

    return (
        <>
            <Container>
                <UserInfoContainer>
                    <Avatar alt={userName || ""} src={userImage || "/static/images/avatar/1.jpg"} className="profile-image" />
                    <h3 className="profile-name">{userName || "Loading Username..."}</h3>
                    <h3 className="profile-location">{userLocation || "Singapore"}</h3>
                    <h4 className="profile-reviews">{reviewTotalRating || "Loading..."} Reviews</h4>
                </UserInfoContainer>
                <UserReviewContainer>
                    {reviewEditing && (isUserReview || currentUser === "root") ?
                    <UserReviewContainer className="bg-white">
                    <Rating className="userRatingStars" name="user-rating" onChange={onChangeRating} defaultValue={5} value={reviewEditRating} precision={0.5} />
                    <input className="reviewEdit-subject" onChange={onChangeSubject} value={reviewEditSubject} />
                    <textarea className="reviewEdit-description" onChange={onChangeBody} value={reviewEditBody} />
                    <ReviewImagesContainer>
                        <FileInput onChange={handleChangeImg1} inputImage={reviewEditImage1}type="file" accept=".png, .jpg, .jpeg"/>
                        <FileInput onChange={handleChangeImg2} inputImage={reviewEditImage2} type="file" accept=".png, .jpg, .jpeg"/>
                        <FileInput onChange={handleChangeImg3} inputImage={reviewEditImage3} type="file" accept=".png, .jpg, .jpeg"/>
                        <FileInput onChange={handleChangeImg4} inputImage={reviewEditImage4} type="file" accept=".png, .jpg, .jpeg"/>
                        <FileInput onChange={handleChangeImg5} inputImage={reviewEditImage5} type="file" accept=".png, .jpg, .jpeg"/>
                    </ReviewImagesContainer>
                    <ButtonContainer>
                    <ButtonMUI variant="contained" color="primary" onClick={handleReviewEditSave}>Save</ButtonMUI>
                    <ButtonMUI variant="contained" color="error" onClick={handleEditReviewClose}>Cancel</ButtonMUI>
                    </ButtonContainer>
                    </UserReviewContainer>
                    :
                    <UserReviewContainer>
                    <Rating className="userRatingStars" name="user-rating" defaultValue={5} value={reviewRating} precision={0.5} readOnly />
                    <input className="review-subject" value={reviewSubject || "Loading Subject..."} disabled />
                    <span className="review-description">{reviewDescription || "Loading Description..."}</span>
                    <ReviewImagesContainer>
                        {renderReviewImages()}
                    </ReviewImagesContainer>
                    </UserReviewContainer>}
                    <DateFooter>{reviewDateCreated+ " " + reviewTimeCreated}</DateFooter>
                </UserReviewContainer>
                <Button onClick={handleClick} style={{"background":"transparent", "width": "10px"}}><MoreVertRoundedIcon className="text-black"/></Button>
                
                <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                        'aria-labelledby': 'demo-customized-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleEditReviewClose}
                >
                    {(isUserReview || currentUser === "root") ? <div><MenuItem onClick={handleReviewEdit}>
                        <EditIcon />
                        Edit
                    </MenuItem>
                    <MenuItem onClick={handleReviewDelete} >
                        <DeleteIcon />
                        Delete
                    </MenuItem></div> : []}
                    {(currentUser === "super" || currentUser === "super") ? <div>
                    <MenuItem onClick={handleReviewDelete} >
                        <DeleteIcon />
                        Delete
                    </MenuItem></div> : []}
                    <MenuItem onClick={handleReviewReport} >
                    <ReportIcon />
                        Report
                    </MenuItem>
                </StyledMenu>
                <Snackbar
                    open={reportAlert}
                    autoHideDuration={3000}
                    onClose={handleCloseReport}
                    message={reportAlertText}
                    action={handleActionReport}
                />
            </Container>
        </>
    );
};

export default ReviewCard;
