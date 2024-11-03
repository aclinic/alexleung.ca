import React from "react";
import styled from "styled-components";

type TitleProps = {
  title: string;
};
const Title = ({ title }: TitleProps) => {
  return (
    <AboutTitle>
      <h2>{title}</h2>
    </AboutTitle>
  );
};

const AboutTitle = styled.div`
  font-size: 1.1rem;
  display: flex;
  justify-content: center;
  margin: 0 auto 3rem;

  &::after,
  &::before {
    content: "";
    display: block;
    height: 1px;
    width: 90%;
    background-color: lightgrey;
    position: relative;
    top: 20px;
  }

  h2 {
    display: block;
    width: 100%;
    text-align: center;
  }

  @media (max-width: 500px) {
    &:after,
    &:before {
      width: 40%;
    }
  }

  @media (min-width: 1100px) {
    font-size: 2rem;
    display: flex;

    &::after,
    &::before {
      top: 35px;
      width: 90%;
    }
  }
`;

export default Title;
