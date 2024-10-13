import React from 'react';
import styled from 'styled-components';

const About: React.FC = () => {
  return (
    <AboutContainer>
      <h1>About Utile</h1>
      <p>
      Welcome to Utile, where we make information accessible to everyone.
      </p>
      <p>
      At Utile, you can connect with experts, whom we call "Beavers," who specialize in various fields and offer one-on-one services. Anyone can sign up to become a Beaver, as long as they provide valid credentials that ensure their expertise and trustworthiness.
      </p>
      <p>Our community members, known as "Kits," can explore our Beaver marketplace to request services tailored to their needs. By reading reviews and detailed bios, Kits can choose the perfect Beaver for personalized, one-on-one sessions in the area they need assistance with.</p>

      {/* Group Photo Section */}
      <GroupPhotoContainer>
        <img src="https://cdn.discordapp.com/attachments/1291992075021062187/1294815628372475995/IMG_2917.jpg?ex=670c6286&is=670b1106&hm=d90d2e92e5a6c1c8d4665100cfd368fa9d332d825e17558c10440a7bfb5e983b&" alt="Group of creators of Utile" />
        <Caption>Meet the team behind Utile!</Caption>
      </GroupPhotoContainer>
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

// Styled component for the group photo section
const GroupPhotoContainer = styled.div`
  margin-top: 30px;

  img {
    width: 100%;
    max-width: 400px;
    border-radius: 10px;
    margin-bottom: 10px;
  }
`;

const Caption = styled.p`
  font-size: 1rem;
  font-style: italic;
  color: #555;
`;

export default About;
