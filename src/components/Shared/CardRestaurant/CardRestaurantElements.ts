import styled from "styled-components";
import {Color_DarkStoneGray } from "../../../constants/DesignConstants";

export const Container = styled.div`
  padding: 40px;
  .card{
    background-color: ${Color_DarkStoneGray};
    border-radius: 11px;
    transition: 0.5s all ease;
  }
  
  .card:hover {
    // box-shadow: 2px 12px 15px #999;
      // transform: translateY(-2px);
      transform: scale(1.1);
      transition: 0.5s all ease;
      cursor: pointer;
  }

  .card-title {
  font-weight: bold;
  font-size: 125%;
  color: white;
  text-align: left;
  }

  .card-text{
    color: white;
    text-align: left;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  padding: 5px 0 5px 10px;
  h4{
    font-size: 100%;
    color: white;
  }
`;

export const ContentTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  padding-bottom: 10px;
`;

export const CardImage = styled.div`
  width: 100%;
  height: auto;
  .card-img-top{
    object-fit: fit;
    width: 100%;
    height: 20vh;
    border-radius: 11px;
    padding: 1px;
  }
`;
