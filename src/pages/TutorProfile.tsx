import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

interface Tutor {
  id: number;
  name: string;
  email: string;
  bio: string;
  imageURL: string;
  subject: string;
  concentration: string;
  rating: number;
}

const TutorProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [tutor, setTutor] = useState<Tutor | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        const numericId = Number(id);
        const response = await axios.get(`http://localhost:5001/api/tutors/${numericId}`);
        setTutor(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch tutor details');
        setLoading(false);
      }
    };

    fetchTutor();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!tutor) return <p>No tutor found</p>;

  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfileImage src={tutor.imageURL} alt={tutor.name} />
        <div>
          <TutorName>{tutor.name}</TutorName>
          <TutorEmail>Email: {tutor.email}</TutorEmail>
        </div>
        <InfoContainer>
          <InfoItem><strong>Subject:</strong> {tutor.subject}</InfoItem>
          <InfoItem><strong>Concentration:</strong> {tutor.concentration}</InfoItem>
          <InfoItem><strong>Rating:</strong> {tutor.rating}/5</InfoItem>
        </InfoContainer>
      </ProfileHeader>
      <TutorBio>{tutor.bio}</TutorBio>
    </ProfileContainer>
  );
};

// Styled-components for formatting
const ProfileContainer = styled.div`
  margin: 40px auto;
  max-width: 800px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: space-between;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-right: 20px;
`;

const TutorName = styled.h1`
  font-size: 2rem;
  margin: 0;
`;

const TutorEmail = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin-top: 10px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const InfoItem = styled.p`
  font-size: 1rem;
  margin: 5px 0;
`;

const TutorBio = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-top: 20px;
`;

export default TutorProfile;
