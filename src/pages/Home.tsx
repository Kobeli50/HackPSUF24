import React from 'react';
import TutorList from '../components/TutorList';

const Home: React.FC = () => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h1>Find Your e-kitten</h1>
      </div>
      <TutorList />
    </div>
  );
};

export default Home;
