import React, { useEffect, useState } from 'react';
import TutorCard from './TutorCard';
import axios from 'axios';

interface Tutor {
  id: number;
  name: string;
  subject: string;
  concentration: string;
  rating: number;
  imageURL: string;
}

const TutorList: React.FC = () => {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Example data; Replace with an API call
    const fetchTutors = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/tutors');
        setTutors(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch tutors');
        setLoading(false);  // Turn off loading even if there is an error
        console.error('Error fetching tutors:', error);
      }
    };

    fetchTutors();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {tutors.map((tutor) => (
        <TutorCard
          key={tutor.id}
          id={tutor.id}
          name={tutor.name}
          subject={tutor.subject}
          concentration={tutor.concentration}
          rating={tutor.rating}
          imageUrl={tutor.imageURL}
        />
      ))}
    </div>
  );
};

export default TutorList;
