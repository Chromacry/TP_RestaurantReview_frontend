import React, { FC, useContext, useEffect, useState } from "react";
import { NodeProps } from "../../types/CommonType";

import {
    Container,
    TitleContainer,
    MainContent,
    Title,
} from "./AboutElements";
import Layout from "../Layout/Layout";

const About: FC<NodeProps> = () => {
    return (
        <>
            <Layout>
                <Container>
                    <TitleContainer>
                        <Title>About Us</Title>
                        <h5>Heavenly Eats, Decide your next meal.</h5>
                        <hr></hr>
                    </TitleContainer>
                    <MainContent>
                        <p>Heavenly Eats is a Professional F&B Review Platform. We're dedicated to providing you the best of F&B Review, with a focus on dependability and Food Review, Restaurant Review, Service Review, and decide your next place to have your meal.
                            <br />
                            We're working to turn our passion for F&B Review into a booming online website. We hope you enjoy our F&B Review as much as we enjoy offering them to you.</p>
                        <h2>Our Mission</h2>
                        <p>We want to help anyone from all ages to decide your next place to eat with originality, honesty and sincerity.</p>
                        <h2>Our Vision</h2>
                        <p>To provide a singular platform to help you decide your next place to eat.</p>
                    </MainContent>
                </Container>
            </Layout>
        </>
    );
};

export default About;
