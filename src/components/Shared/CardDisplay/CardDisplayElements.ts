import styled from "styled-components";

export const Container = styled.div`
  .card-img-top{
    height: 20vh;
    width: 100%;
    object-fit: fit;
    border-radius: 11px;
    cursor: pointer;
    transition: 0.5s all ease;

    &:hover {
      box-shadow: 2px 12px 15px #999;
      // transform: translateY(-2px);
      transform: scale(1.1);
      filter: brightness(75%);
      transition: 0.5s all ease;
      cursor: pointer;
    }
  }
  .card-title {
    font-weight: bold;
    font-size: 120%;
    text-align: center;
  }
  .card-text{
    margin-top: 10px;
    color: black;
    text-align: center;
  }
}
`;

export const CardImage = styled.div`
  padding: 20px;
`;
