import React from 'react'
import styled from 'styled-components';
import Title from './Title';
import Skills from './Skills';

const About = () => {
  return (
    <AboutStyled className='section-center'>
      <Title title='About Me' />
      <AboutCenter>
        <AboutInfo>
          I'm formally trained in electrical engineering but I really enjoy the fast-paced and dynamic discipline of software engineering. My current interests lie in applying effective software design to craft solutions for practical problems. In my spare time I enjoy keeping up with my craft, reading, and enjoying time with doges. <br /><br />

          <Skills />
        </AboutInfo>
        <img
          src='assets/about.jpg'
          alt='Alex with his dog'
        />
      </AboutCenter>
    </AboutStyled>
  )
}

const AboutStyled = styled.section`
  padding:5rem 0 0;
`;

const AboutCenter = styled.div`
 @media (min-width: 992px) {
    display: grid;
    grid-template-columns: 3fr 2fr;
    column-gap: 4rem;
    padding-top: 2rem;
  }
`;

const AboutInfo = styled.div`
  text-align: left;
  line-height:1.8;
  font-weight: 1.2rem;
  margin-bottom:2rem;

  @media (min-width: 992px) {
    width: 90%;
  }
`

export default About