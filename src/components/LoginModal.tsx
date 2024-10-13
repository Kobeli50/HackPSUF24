// src/components/LoginModal.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: any) => void;
}

const LoginModal: React.FC<ModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post('http://localhost:5001/api/login', {
        username,
        password,
      });

      // If login is successful, pass the user data to the parent component (or store in state)
      onLoginSuccess(response.data.user);
      onClose();  // Close the modal
    } catch (error) {
      // Handle any error response from the API
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data.message) {
          setError(error.response.data.message);  // Show API error message
        } else {
          setError('Login failed. Please try again.');
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  if (!isOpen) return null; // Return null if the modal is not open

  return (
    <ModalOverlay>
      <ModalContainer>
        <CloseButton onClick={onClose}>X</CloseButton>
        <h2>Login</h2>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form onSubmit={handleLogin}>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <SubmitButton type="submit">Login</SubmitButton>
        </form>
      </ModalContainer>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 40px; /* Increased padding for more space */
  border-radius: 5px;
  width: 400px; /* Increased width for a bigger modal */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative; /* Set position relative for close button */
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;

export default LoginModal;
