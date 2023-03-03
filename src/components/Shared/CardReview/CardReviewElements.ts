import styled from "styled-components";


export const Container = styled.div`
  padding: 40px;
  .card{
    background-color: #4D4D4D;
    border-radius: 11px;
    padding: 10px;
    transition: 0.5s all ease;
  }
  .card-img{
      height: 20vh;
      width: 100%;
      object-fit: cover;
      border-radius: inherit;
  }
  .profile-image{
      width: 75px;
      height: 75px;
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
  text-align: center;
  }

  .card-text{
    color: white;
    text-align: left;
  }
  
`;


export const ProfileWrapper = styled.div`
  border-radius: 30px;
  object-fit: cover;
  margin-right: 20px;
  width: 20%;
`;

export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 10px;
`;

export const ContentTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
