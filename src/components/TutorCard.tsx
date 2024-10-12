import React from 'react';
import styled from 'styled-components';

interface TutorCardProps {
  id: number;
  name: string;
  subject: string;
  concentration: string;
  rating: number;
  imageUrl: string;
}

const TutorCard: React.FC<TutorCardProps> = ({ id, name, subject, concentration, rating, imageUrl }) => {
  return (
    <Card>
      <ProfileImage src={imageUrl} alt={name} />
      <Info>
        <h3>{name}</h3>
        <p>Subject: {subject}</p>
        <p>Concentration: {concentration}</p>
        <p>Rating: {rating}/5</p>
        <a href={`/tutor/${id}`}>View Profile</a>
      </Info>
    </Card>
  );
};

const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 15px;
  display: flex;
  align-items: center;
  margin: 10px;
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;

const Info = styled.div`
  margin-left: 15px;
`;

export default TutorCard;
