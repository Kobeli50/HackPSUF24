// src/components/Header.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LoginModal from './LoginModal'; // Import the modal
import SignupModal from './SignupModal'; // Import the SignupModal
import emailjs from 'emailjs-com';

const Header: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // State to manage login modal visibility
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false); // State to manage signup modal visibility
  const [user, setUser] = useState<any | null>(null);

  const handleLoginClick = () => {
    setIsLoginModalOpen(true); // Open the login modal
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false); // Close the login modal
  };

  const handleSignupClick = () => {
    setIsSignupModalOpen(true); // Open the signup modal
  };

  const handleCloseSignupModal = () => {
    setIsSignupModalOpen(false); // Close the signup modal
  };
  
  const handleLoginSuccess = (loggedInUser: any) => {
    setUser(loggedInUser); // Update the state with logged-in user
    setIsLoginModalOpen(false); // Close the login modal after successful login
  };

  const handleLogout = () => {
    setUser(null); // Clear the logged-in user on logout
  };

  return (
    <HeaderContainer>
      <LeftSection>
        <LogoContainer>
          <StyledLink to="/">
            <LogoImage
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCmnj60g7OyJDC1Ny68GfobfcgP6vALjFC6g&s"
              alt="Logo"
            />
          </StyledLink>
        </LogoContainer>
        
        <Logo>Utile</Logo>
        
        <Nav>
          <NavItem>
            <StyledLink to="/">Home</StyledLink>
          </NavItem>
          <NavItem>
            <StyledLink to="/about">About</StyledLink>
          </NavItem>
          <NavItem>
            <StyledLink to="/forum">Forum</StyledLink>
          </NavItem>
          <NavItem>
            <StyledLink to="/apply">Apply</StyledLink>
          </NavItem>
          <NavItem>
            <StyledLink to="/chat">AI Chat</StyledLink> {/* New AI Chat link */}
          </NavItem>
        </Nav>
      </LeftSection>

      {/* Right section with Discord logo and Login & Sign Up buttons */}
      <RightSection>  
        <DiscordContainer>
          <a href="https://discord.gg/UmS4VXGjRz" target="_blank" rel="noopener noreferrer">
            <DiscordLogo
              src="https://logos-world.net/wp-content/uploads/2020/12/Discord-Logo.png"
              alt="Discord Logo"
            />
          </a>
        </DiscordContainer>

        <ButtonsContainer>
        {user ? (
            <>
              <p>Welcome, {user.username}!</p>
              <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            </>
          ) : (
            <>
              <LoginButton onClick={handleLoginClick}>Login</LoginButton> {/* Open login modal on click */}
              <SignupButton onClick={handleSignupClick}>Sign Up</SignupButton> {/* Open signup modal on click */}
            </>
          )}
        </ButtonsContainer>
      </RightSection>
      

      {/* Render the Login and Signup Modals */}
      <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseLoginModal} onLoginSuccess={handleLoginSuccess} />
      <SignupModal isOpen={isSignupModalOpen} onClose={handleCloseSignupModal} />
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  background-color: #E8E4C9;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: black;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

const LogoImage = styled.img`
  width: 75px;
  height: 75px;
  border-radius: 50%;
  object-fit: cover;
`;

const Logo = styled.h1`
  font-size: 2rem;
  margin-right: 20px;
`;

const Nav = styled.nav`
  display: flex;
`;

const NavItem = styled.div`
  margin-left: 20px;
`;

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  font-size: 1.10rem;

  &:hover {
    text-decoration: underline;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

const DiscordContainer = styled.div`
  display: flex;
  align-items: center;
`;

const DiscordLogo = styled.img`
  width: 50px; // Adjust size as needed
  object-fit: cover;
  cursor: pointer;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column; // Stack buttons vertically
  margin-left: 20px; // Space between Discord logo and buttons
`;

const LoginButton = styled.button`
  padding: 10px 15px; /* Padding for the button */
  background-color: #4CAF50; /* Green background */
  color: white; /* White text */
  border: none; /* No border */
  border-radius: 5px; /* Rounded corners */
  font-weight: bold; /* Bold text */
  cursor: pointer;
  transition: background-color 0.3s; /* Smooth transition for hover effect */
  margin-bottom: 10px; /* Space between buttons */

  &:hover {
    background-color: #45a049; /* Darker green on hover */
  }
`;

const SignupButton = styled(LoginButton)`
  background-color: #2196F3; /* Different color for Sign Up */
  
  &:hover {
    background-color: #1e88e5; /* Darker shade on hover */
  }
`;

const SupportButton = styled.button`
  margin-left: 20px;
  padding: 10px 15px;
  background-color: #FF9800; /* Orange background */
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #F57C00; /* Darker orange on hover */
  }
`;

const LogoutButton = styled.button`
  padding: 10px 15px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e53935;
  }
`;

export default Header;
