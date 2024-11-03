import React from 'react'
import styled from 'styled-components';
import { FcEngineering } from "react-icons/fc";

const Home = () => {
  return (
    <HomeStyled>
      <HomeCenter className='section-center'>
        <HomeInfo>
          <TextAnimation>
            <p>Hi, my name is</p>
            <h1>alex leung</h1>
          </TextAnimation>
          <TextAnimation bottom>
            <h3>
              Software Engineer <FcEngineering className='engineering-icon' />
            </h3>
          </TextAnimation>
        </HomeInfo>
      </HomeCenter>
    </HomeStyled>
  )
}

const HomeStyled = styled.section`
  height: 100vh;
  position: relative; 
`;

const HomeCenter = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const HomeInfo = styled.div`
  h1{
    display:inline-block;
    font-weight: 900;
    text-transform: uppercase;
    font-size: 4rem; 
    letter-spacing: 0.2rem; 
    line-height: 0.9;
    margin-bottom:1rem;
  }

  h3 {
    font-size:1.2rem;
  }

  p{
    font-size: 1.1rem;
    margin:0 0 1rem;
    color: var(--clr-hover);
    letter-spacing: 0.08rem;
  }

  span {
    display:inline-block;
  }

  .engineering-icon{
    vertical-align: middle;
    margin-left:0.3rem;
    margin-bottom:0.2rem;
  }

  @media (min-width: 768px) {
    h1 {
      font-size: 8rem;
      padding-bottom:1rem;
    }

    h3 {
      font-size: 2rem;
    }

    p{
    font-size: 1.5rem;
    }
  }
`;

const TextAnimation = styled.div`
  animation: showTopText 1s;
  animation-delay: ${props => props.bottom ? '0.8s' : '0.5s'};
  animation-fill-mode: forwards;
  opacity:0;
  transform: translate(0, 100%);

  @keyframes showTopText {
    0% { 
      transform: translate(0, 100%); 
      opacity: 0 
    }
    100% { 
      transform: translate(0, 0);
      opacity:1
    }
  }
`;

export default Home