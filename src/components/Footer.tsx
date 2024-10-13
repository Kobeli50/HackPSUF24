import React from 'react';
import styled from 'styled-components';

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <p>© 2024 Utile. All rights reserved.</p>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background-color: #282c34;
  color: white;
  padding: 20px;
  text-align: center;
  position: relative;
  bottom: 0;
  width: 97.5%;
`;

export default Footer;
