// src/pages/Login.tsx
import React from 'react';
import styled from 'styled-components';

const Login: React.FC = () => {
  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle login logic here
    console.log("Login submitted");
  };

  return (
    <LoginContainer>
      <h1>Login</h1>
      <LoginForm onSubmit={handleLogin}>
        <input type="text" placeholder="Username" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </LoginForm>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; // Full screen height
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;

  input {
    margin: 10px 0;
    padding: 10px;
    font-size: 1rem;
  }

  button {
    padding: 10px;
    font-size: 1rem;
    background-color: #4CAF50; // Green button
    color: white;
    border: none;
    cursor: pointer;

    &:hover {
      background-color: #45a049; // Darker green on hover
    }
  }
`;

export default Login;
