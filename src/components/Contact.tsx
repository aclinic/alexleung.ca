import React from 'react'
import styled from 'styled-components';
import Title from './Title';

const Contact = () => {
  return (
    <ContactStyled className='section-center'>
      <Title title='Get In Touch'/>
      <p>If you want to get in touch with me, send an email to <strong>mail [at] alexleung.ca</strong> or reach out on social media.</p>
    </ContactStyled>
  )
}

const ContactStyled = styled.section`
  padding:5rem 0;
  text-align:center;
`;

export default Contact