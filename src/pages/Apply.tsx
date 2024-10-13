import React, { useState } from 'react';
import styled from 'styled-components';
import emailjs from 'emailjs-com';

const Apply: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    bio: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false); // New state for submission status

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    emailjs
      .send(
        'service_5mgbj2c', // Replace with your service ID
        'template_jxp6kht', // Replace with your template ID
        formData,
        'bR-5dZdRntfBqwcMW' // Replace with your public key (user ID)
      )
      .then(
        (result) => {
          setIsSubmitted(true); // Update state on successful submission
          setFormData({
            name: '',
            email: '',
            subject: '',
            bio: '',
          });
        },
        (error) => {
          alert('There was an error sending the application.');
          console.error('Error:', error.text);
        }
      );
  };

  // Conditional rendering based on form submission
  if (isSubmitted) {
    return (
      <SuccessContainer>
        <h1>Application Sent Successfully!</h1>
        <p>Thank you for applying to become a Beaver. We will review your application and get back to you soon.</p>
      </SuccessContainer>
    );
  }

  return (
    <FormContainer>
      <h1>Apply to Become a Beaver</h1>
      <form onSubmit={handleSubmit}>
        <Label>
          Name:
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Label>

        <Label>
          Email:
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Label>

        <Label>
          Subject Expertise:
          <Input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </Label>

        <Label>
          Bio:
          <TextArea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            required
          />
        </Label>

        <SubmitButton type="submit">Submit Application</SubmitButton>
      </form>
    </FormContainer>
  );
};

// Styled components for form styling
const FormContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 15px;
  font-size: 1.1rem;
`;

const Input = styled.input`
  width: 95%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  width: 95%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  height: 100px;
`;

const SubmitButton = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

// New styled component for success page
const SuccessContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #e0f7fa;
  border-radius: 10px;
  text-align: center;

  h1 {
    color: #00796b;
  }

  p {
    font-size: 1.2rem;
    color: #004d40;
  }
`;

export default Apply;
