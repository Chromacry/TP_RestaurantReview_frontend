import { Link } from "react-router-dom";
import styled from "styled-components";
import { Color_DarkBlue } from "../../constants/DesignConstants";


export const Container = styled.div`
  background: linear-gradient(#57ADFE, #9768FE);
  width: 100%;
  height: 100%;
  padding: 25px;
  display: grid;
  place-items: center;
`;

export const Card = styled.div`
  background-color: ${Color_DarkBlue};
  border-radius: 11px;
  width: 50%;
  height: auto;
  margin: 10%;
`;

export const CardContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  width: 100%;
  height: 100%;
`;

export const MainInputContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
`;

export const InputContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
  position: relative;
  width: 100%;

  @media screen and (max-width: 768px) {
    width: 40%;
  }
  @media screen and (max-width: 425px) {
    width: 50%;
  }
`;

export const Input = styled.input`
  position: relative;
  outline: none;
  border: none;
  width: 100%;
  padding: 17px;
  padding-left: 50px;
  color: grey;
  border-radius: 10px;
`;

export const Icon = styled.div`
  position: absolute;
  z-index: 999;
  color: grey;
  top: 14px;
  left: 3%;
`;

export const Button = styled.button`
  width: 50%;
  height: 50px;
  outline: none;
  border: none;
  border-radius: 5px;
  background-color: dodgerblue;
  color: #fff;
  margin-top: 30px;
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #007aec;
  }
  @media screen and (max-width: 768px) {
    width: 40%;
  }
  @media screen and (max-width: 425px) {
    width: 50%;
  }
`;

export const ErrorText = styled.small`
  color: red;
  font-weight: 500;
  padding-top: 5px;
  align-self: flex-start;
`;
export const SuccessText = styled.small`
  color: green;
  font-weight: 500;
  padding-top: 5px;
  align-self: flex-start;
`;

export const Image = styled.img`
    height: auto;
    width: 25%;
    margin-bottom: 40px;
    // border-radius: 10px;
`;

export const Title = styled.h2`
    color: #FFFFFF;
    font-weight: bold;
    font-size: 150%;
    margin-bottom: 30px;
`;

export const InputTitle = styled.h3`
    color: #FFFFFF;
    // font-weight: bold;
    font-size: 115%;
    text-align: left;
    width: 100%;
    padding-bottom: 10px;
`;


export const LoginLink = styled.small`
  margin-top: 20px;
  color: #98fb98;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 10px;
  &:hover {
    text-decoration: underline;
  }
`;

