import React from 'react';
import styled from 'styled-components';
import { data } from '../constants/socialLinks';

const SocialLinks = () => {
  return (
    <SocialLayout>
      {
        data.map(link => (
          <IconsList key={link.id}>
            <a href={link.url}>{link.icon}</a>
          </IconsList>
        ))
      }
    </SocialLayout>
  )
}

const SocialLayout = styled.aside`
  display:none;

  @media(min-width: 1100px) {
    display:block;
    position: fixed;
    bottom: 12%;
    transform: translateY(50%);
    left: 3rem;
    z-index:99;

    &::after{
      content:'';
      display:block;
      height: 150px;
      width: 1px;
      background-color: lightgrey;
      position:relative;
      top:10px;
      margin-left: 10px;
    }
  }
`;

const IconsList = styled.li`
  list-style-type: none;
  margin: 0.5rem 0;

  a{
    font-size: 1.4rem;
    color: var(--clr-hover);
  }
`

export default SocialLinks