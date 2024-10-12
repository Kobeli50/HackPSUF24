import React, { useEffect, useState } from 'react';
import TutorCard from './TutorCard';

interface Tutor {
  id: number;
  name: string;
  subject: string;
  concentration: string;
  rating: number;
  imageUrl: string;
}

const TutorList: React.FC = () => {
  const [tutors, setTutors] = useState<Tutor[]>([]);

  useEffect(() => {
    // Example data; Replace with an API call
    const fetchTutors = async () => {
      const data = [
        { id: 1, name: 'Nooban 420', subject: 'Math', concentration: 'Calculus', rating: 2.69, imageUrl: 'https://cdn.discordapp.com/attachments/1199163361347239977/1224467614508519424/image.png?ex=670ae754&is=670995d4&hm=9b6b667a5f38f9212c1638dcebfecf9bcc6a91bb91be793e044e802b833d24f6&' },
        { id: 2, name: 'WOWWA', subject: 'Being 7', concentration: 'chicken pizza', rating: 7, imageUrl: 'https://media.discordapp.net/attachments/1199163361347239977/1221265945046290492/IMG_6973.png?ex=670b1f0b&is=6709cd8b&hm=f4e8d94f2991977c19c88641e78094103a1c7f43514cd296044e5f11c58989ec&=&format=webp&quality=lossless&width=1102&height=1068' },
      ];
      setTutors(data);
    };

    fetchTutors();
  }, []);

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
          imageUrl={tutor.imageUrl}
        />
      ))}
    </div>
  );
};

export default TutorList;
