import styled from "styled-components";
import { data } from "../constants/socialLinks";

const Footer = () => {
  return (
    <FooterStyled className="section-center">
      {data.map((link) => (
        <IconsList key={link.id}>
          <a href={link.url}>{link.icon}</a>
        </IconsList>
      ))}
      <p>Copyright &copy; 2020, 2024 Alex Leung</p>
    </FooterStyled>
  );
};

const FooterStyled = styled.section`
  padding: 5rem 0 1rem;
  text-align: center;
`;

const IconsList = styled.li`
  list-style-type: none;
  display: inline-block;
  margin: 0 0.5rem 1rem;

  a {
    font-size: 1.4rem;
    color: ${({ theme }) => theme.text};
  }

  @media (min-width: 1100px) {
    display: none;
  }
`;

export default Footer;
