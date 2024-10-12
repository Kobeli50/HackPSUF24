import React from 'react';
import { useParams } from 'react-router-dom';

const TutorProfile: React.FC = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Tutor Profile: {id}</h1>
      {/* Here you can fetch and display the specific tutor's detailed information */}
    </div>
  );
};

export default TutorProfile;
