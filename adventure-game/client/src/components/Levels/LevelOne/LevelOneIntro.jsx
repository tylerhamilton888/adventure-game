import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LevelOneIntro() {
  const navigate = useNavigate();
  const selectedCharacter = JSON.parse(localStorage.getItem('selectedCharacter'));

  const handleStartAdventure = () => {
    navigate('/level-one/armory');
  };

  return (
    <div>
      <h2>The Adventure Begins</h2>
      <p>
        You are {selectedCharacter.name}, a {selectedCharacter.className} from the {selectedCharacter.originName} tribe.
        With a heart full of courage and a strong sense of duty, you stand at the threshold of the unknown, ready to prove yourself.
      </p>
      <p>The first task awaits you - find yourself a weapon and armor in the old Armory to prepare for the challenges ahead.</p>
      <button onClick={handleStartAdventure}>Enter the Armory</button>
    </div>
  );
}
