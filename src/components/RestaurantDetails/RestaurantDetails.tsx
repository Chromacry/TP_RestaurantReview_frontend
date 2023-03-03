import { ChangeEvent, FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { restaurantgetbyIDApi } from "../../services/Routes/RestaurantsApi";
import { reviewscreatebyIDApi, reviewsgetbyRestaurantIDApi } from "../../services/Routes/ReviewsApi";
import { ResponseReviewErrorApiType,ResponseReviewsApiType, ResponseReviewsApiDataType, ResponseReviewsData, ReviewProps } from "../../types/ReviewType";
import { ResponseErrorRestaurantApiDataType, ResponseRestaurantApiDataType, ResponseRestaurantApiType, ResponseRestaurantData } from "../../types/RestaurantType";
import { ResponseRestaurantDetailsApiDataType, ResponseRestaurantDetailsApiType, ResponseRestaurantDetailsData } from "../../types/RestaurantDetailsType";
import {
    Container,
    TitleContainer,
    RatingContainer,
    InformationSection,
    ReviewSection,
    RestaurantImagesContainer,
    DescriptionContainer,
    InformationDetailsContainer,
    Title,
    Image,
    ReviewTitleContainer,
    FileInputContainer,
    FileInput,
} from "./RestaurantDetailsElements";
import Layout from "../Layout/Layout";
import Map from "../Shared/Map/Map";
import Rating from '@mui/material/Rating';
import ReviewCard from "./ReviewCard/ReviewCard";
import Button from "@mui/material/Button";
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import { STATUS_CODES } from "../../constants/GlobalConstants";
import Alert from "@mui/material/Alert";

const RestaurantDetails: FC<ReviewProps> = ({ }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const itemID = location.state.restaurantitemID;

    const [restaurantsObject, setRestaurantsObject] = useState(Object);
    const [dataLoadedRestaurant, setDataLoadedRestaurant] = useState(false);

    const [reviewsObject, setReviewsObject] = useState(Object);
    const [dataLoadedReview, setDataLoadedReview] = useState(false);

    const [averageRatingValue, setAverageRatingValue] = useState(5);
    const [totalReviewsValue, setTotalReviewsValue] = useState(0);

    const [addReviewOpen, setAddReviewOpen] = useState(false);

    const [successText, setSuccessText] = useState("");
    const [errorText, setErrorText] = useState("");
    const [errorFormText, setErrorFormText] = useState("");

    // * Data for RestaurantDetails
    const [restaurantLogoValue, setRestaurantLogoValue] = useState("");
    const [restaurantNameValue, setRestaurantNameValue] = useState("");
    const [restaurantLocationValue, setRestaurantLocationValue] = useState("");
    const [restaurantContactValue, setRestaurantContactValue] = useState("");
    const [restaurantOpenHoursValue, setRestaurantOpenHoursValue] = useState("");

    // * Data for add review form
    const [reviewRatingValue, setReviewRatingValue] = useState(0);
    const [reviewSubjectValue, setReviewSubjectValue] = useState("");
    const [reviewBodyValue, setReviewBodyValue] = useState("");
    
    const [reviewImageValue1, setReviewImageValue1] = useState("");
    const [reviewImageValue2, setReviewImageValue2] = useState("");
    const [reviewImageValue3, setReviewImageValue3] = useState("");
    const [reviewImageValue4, setReviewImageValue4] = useState("");
    const [reviewImageValue5, setReviewImageValue5] = useState("");
    
    useEffect(() => {
        restaurantApiHandler();
        reviewsApiHandler();
    }, []);

    const restaurantApiHandler = async () => {
        const dataObject = {
            id: itemID
        }
        await restaurantgetbyIDApi(dataObject)
            .then((res: ResponseRestaurantDetailsApiType) => {
                const resApiData: ResponseRestaurantDetailsApiDataType = res?.data;
                const resData: ResponseRestaurantDetailsData = resApiData?.data;
                setRestaurantsObject(resData);

                setRestaurantLogoValue(resData[0].restaurantLogo?.toString() || "-");
                setRestaurantNameValue(resData[0].restaurantName?.toString() || "-");
                setRestaurantContactValue(resData[0].contact?.toString() || "-");
                setRestaurantLocationValue(resData[0].location?.toString() || "-");
                setRestaurantOpenHoursValue(resData[0].openHours?.toString() || "-");
                setDataLoadedRestaurant(true);
            })
            .catch((error: ResponseErrorRestaurantApiDataType) => {
                console.warn(error);
            });
    }

    const reviewsApiHandler = async () => {
        const dataObject = {
            restaurantID: itemID
        }
        console.log(itemID)
        await reviewsgetbyRestaurantIDApi(dataObject)
            .then((res: ResponseReviewsApiType) => {
                const resApiData: ResponseReviewsApiDataType = res?.data;
                const resData: ResponseReviewsData = resApiData?.data;
                console.log(resData);
                setReviewsObject(resData);
                setDataLoadedReview(true);
                getReviewsAverage(resData);
            })
            .catch((error: ResponseErrorRestaurantApiDataType) => {
                console.warn(error);
            });
    }

    const getReviewsAverage = (reviewsObject : any) => {
        let totalRatings : number = 0;
        let totalReviews : number = 0;
        if (reviewsObject) {
            for (let i = 0; i < reviewsObject.length; i++) {
                if (reviewsObject[i].timestampDeleted === null){
                    totalRatings += parseFloat(reviewsObject[i].ratings as string);
                    totalReviews += 1;
                }
            }
            totalRatings = totalRatings / totalReviews;
            setAverageRatingValue(totalRatings);
            setTotalReviewsValue(totalReviews);
        }
    }

    const fileToBase64 = (file : File) => new Promise((resolve, reject) => {
        if (!file) return;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const handleOpenAddReviewbtn = () => {
        if (!localStorage.getItem('tpUserAuth')) {
            setErrorText("Please login and try again!");

            setTimeout(() => {
                setErrorText("");
                window.location.reload();
            }, 2500);
            return;
        }
        setAddReviewOpen(true);
    }
    const handleCloseAddReviewbtn = () => {
        setAddReviewOpen(false);

        setReviewRatingValue(0);
        setReviewSubjectValue("");
        setReviewBodyValue("");

        setReviewImageValue1("");
        setReviewImageValue2("");
        setReviewImageValue3("");
        setReviewImageValue4("");
        setReviewImageValue5("");
    }

    const handleChangeRating = (event: ChangeEvent<unknown>, newValue: number | any) => {
        setReviewRatingValue(newValue);
    }

    const handleChangeSubject = (event: ChangeEvent<HTMLInputElement>) => {
        setReviewSubjectValue(event.target.value);
        console.log(event.target.value);
    }

    const handleChangeBody = async (event: ChangeEvent<HTMLTextAreaElement>) => {
        setReviewBodyValue(event.target.value);
        console.log(event.target.value);
    }
    const handleChangeImg1 = async (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        setReviewImageValue1(await fileToBase64(event.target.files[0]) as string);
    }
    const handleChangeImg2 = async (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        setReviewImageValue2(await fileToBase64(event.target.files[0]) as string);
    }
    const handleChangeImg3 = async (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        setReviewImageValue3(await fileToBase64(event.target.files[0]) as string);
    }
    const handleChangeImg4 = async (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        setReviewImageValue4(await fileToBase64(event.target.files[0]) as string);
    }
    const handleChangeImg5 = async (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        setReviewImageValue5(await fileToBase64(event.target.files[0]) as string);
    }
    const handleSubmitReview = async () => {
        if (reviewRatingValue === 0 || reviewSubjectValue === "" || reviewBodyValue === "") {
            setErrorFormText("Please fill in all the review");

            setTimeout(() => {
                setErrorFormText("");
            }, 1500)
            return;
        }
        if (!localStorage.getItem('tpUserAuth')) {
            setErrorText("Please login and try again!");

                    setTimeout(() => {
                        setErrorText("");
                        window.location.reload();
                    }, 2500);
            setAddReviewOpen(false);
            return;
        }
        const dataObject = {
            accountID: JSON.parse(localStorage.getItem('tpUserAuth') as string).id,
            restaurantID: itemID,
            ratings: reviewRatingValue,
            reviewSubject: reviewSubjectValue,
            reviewBody: reviewBodyValue,
            reviewImage1: reviewImageValue1,
            reviewImage2: reviewImageValue2,
            reviewImage3: reviewImageValue3,
            reviewImage4: reviewImageValue4,
            reviewImage5: reviewImageValue5,
            token: JSON.parse(localStorage.getItem('tpUserAuth') as string).token,
        }
        await reviewscreatebyIDApi(dataObject)
            .then((res: ResponseRestaurantDetailsApiType) => {
                const resApiData: ResponseReviewsApiDataType = res?.data;
                console.log(resApiData);
                if(resApiData.status !== STATUS_CODES.SUCCESS_CODE) {
                    setSuccessText("");
                    console.warn(resApiData.message);
                    setErrorText("Please login and try again!");

                    setTimeout(() => {
                        setErrorText("");
                        window.location.reload();
                    }, 2500);

                    return;
                }
                
                setSuccessText("Successfully created review");
                window.location.reload();
            })
            .catch((error: ResponseReviewErrorApiType) => {
                console.warn(error);
            });
    }

    const renderAllReviews = () => {
        let reviewsComponents: any = [];
        if (dataLoadedReview && reviewsObject) {
            for (let i = 0; i < reviewsObject.length; i++) {
                let reviewObjectData: ResponseReviewsData = reviewsObject as ResponseReviewsData;
                if (reviewObjectData[i].timestampDeleted === null){
                    reviewsComponents.push(
                        <ReviewCard key={reviewObjectData[i].id}
                        reviewID={reviewObjectData[i].id}
                        userImage={reviewObjectData[i].profileImage}
                        userName={reviewObjectData[i].username}
                        userLocation={"Singapore"}
                        reviewImage={[reviewObjectData[i].reviewImage1 || "", reviewObjectData[i].reviewImage2 || "", reviewObjectData[i].reviewImage3 || "", reviewObjectData[i].reviewImage4 || "", reviewObjectData[i].reviewImage5 || ""]}
                        reviewRating={Number(reviewObjectData[i].ratings)}
                        reviewSubject={reviewObjectData[i].reviewSubject}
                        reviewDescription={reviewObjectData[i].reviewBody}
                        reviewCreatedDate={reviewObjectData[i].timestampCreated}
                    />);

                }
            }
        }
        return reviewsComponents;
    }
    // * For Modal
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 900,
        bgcolor: '#FFF7F0',
        borderRadius: '11px',
        boxShadow: 24,
    };
    return (
        <>
            <Layout>
                <Container>
                    <TitleContainer>
                        <Title>{restaurantNameValue}</Title>
                        <h5>Heavenly Eats, Decide your next meal.</h5>
                        <hr></hr>
                    </TitleContainer>
                    <RestaurantImagesContainer>
                        <img src={restaurantLogoValue || "logo.png"} alt="" />
                    </RestaurantImagesContainer>
                    <DescriptionContainer>
                        <p>Restaurant Description</p>
                    </DescriptionContainer>
                    <hr></hr>
                    <InformationSection>
                        <InformationDetailsContainer>
                            <h3>Information</h3>
                            <h4>Location</h4>
                            <p>{restaurantLocationValue}</p>
                            <h4>Contact</h4>
                            <p>{restaurantContactValue}</p>
                            <h4>Operation Hours</h4>
                            <p>{restaurantOpenHoursValue}</p>
                        </InformationDetailsContainer>
                        {dataLoadedRestaurant ? <Map location={restaurantLocationValue} /> : <Map location={"Temasek Poly"} />}
                    </InformationSection>
                    <hr></hr>
                    <TitleContainer>
                        <Title>{totalReviewsValue} Reviews</Title>
                        <ReviewTitleContainer>
                            <RatingContainer>
                                <Rating name="half-rating-read" defaultValue={5} value={(averageRatingValue === 0 ? averageRatingValue : 5)} precision={0.5} readOnly />
                                <h3>Ratings: {averageRatingValue ? averageRatingValue.toFixed(1) : "0.0"}</h3>
                            </RatingContainer>
                            <Button data-modal-toggle="modalEl" onClick={handleOpenAddReviewbtn} variant="contained">Add Review</Button>
                        </ReviewTitleContainer>
                        {errorText && <Alert severity="error">{errorText}</Alert>}
                        {successText && <Alert severity="success">{successText}</Alert>}
                        <ReviewSection>
                            <Modal
                                aria-labelledby="transition-modal-title"
                                aria-describedby="transition-modal-description"
                                open={addReviewOpen}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                    timeout: 500,
                                }}
                            >
                            <Fade in={addReviewOpen}>
                                <Box sx={style}>
                                <div className="relative w-full h-full max-w-4xl md:h-auto">
                                    {/* <!-- Modal content --> */}
                                    <div className="relative modal-bg rounded-lg shadow dark:bg-gray-700">
                                        {/* <!-- Modal header --> */}
                                        <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
                                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                                                Write a Review
                                            </h3>
                                        </div>
                                        {/* <!-- Modal body --> */}
                                        <div className="p-6 space-y-6">
                                            {errorFormText && <Alert severity="error">{errorFormText}</Alert>}
                                            <Rating id="reviewRating" name="review-rating" onChange={handleChangeRating} defaultValue={0} value={reviewRatingValue} precision={0.5} size="large" />
                                            <input onChange={handleChangeSubject} value={reviewSubjectValue} type="text" className="text-base rounded-md leading-relaxed text-gray-500 dark:text-gray-400 w-full" placeholder="Subject">
                                            </input>
                                            <textarea onChange={handleChangeBody} value={reviewBodyValue} className="text-base rounded-md leading-relaxed text-gray-500 dark:text-gray-400 w-full" placeholder="Write your review here">
                                            </textarea>
                                            <FileInputContainer>
                                                <FileInput onChange={handleChangeImg1} inputImage={reviewImageValue1}type="file" accept=".png, .jpg, .jpeg"/>
                                                <FileInput onChange={handleChangeImg2} inputImage={reviewImageValue2} type="file" accept=".png, .jpg, .jpeg"/>
                                                <FileInput onChange={handleChangeImg3} inputImage={reviewImageValue3} type="file" accept=".png, .jpg, .jpeg"/>
                                                <FileInput onChange={handleChangeImg4} inputImage={reviewImageValue4} type="file" accept=".png, .jpg, .jpeg"/>
                                                <FileInput onChange={handleChangeImg5} inputImage={reviewImageValue5} type="file" accept=".png, .jpg, .jpeg"/>
                                            </FileInputContainer>
                                        </div>
                                        {/* <!-- Modal footer --> */}
                                        <div className="flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                            <button onClick={handleSubmitReview} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                                            <button onClick={handleCloseAddReviewbtn} type="button" className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-white focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Close</button>
                                        </div>
                                    </div>
                                </div>
                                </Box>
                            </Fade>
                            </Modal>
                            {renderAllReviews()}
                        </ReviewSection>
                    </TitleContainer>
                </Container>
            </Layout>
        </>
    );
};

export default RestaurantDetails;
