import React from 'react';
import styled from 'styled-components';

const About: React.FC = () => {
  return (
    <AboutContainer>
      <h1>About Yachen Sex Den</h1>
      <p>
        Welcome to Yachen Sex Den, where we put the sex in YACHEN
      </p>
      <p>
        nice try Diddy
      </p>
      <p>sex and poker and drugs</p>
    </AboutContainer>
  );
};

const AboutContainer = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  text-align: center;

  h1 {
    font-size: 2rem;
    margin-bottom: 20px;
  }

  p {
    font-size: 1.2rem;
    line-height: 1.6;
    margin-bottom: 15px;
  }
`;

export default About;
