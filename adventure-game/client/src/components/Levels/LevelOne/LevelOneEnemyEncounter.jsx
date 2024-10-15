import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ENEMIES = {
  forest: {
    name: 'Orc Marauder',
    health: 80,
    strength: 12,
    dexterity: 8,
    toughness: 10,
    weaponSkill: 10,
  },
  clearing: {
    name: 'Bandit Leader',
    health: 100,
    strength: 14,
    dexterity: 12,
    toughness: 12,
    weaponSkill: 14,
  },
};

export default function LevelOneEnemyEncounter() {
  const { enemy } = useParams();
  const navigate = useNavigate();
  const enemyData = ENEMIES[enemy];

  if (!enemyData) {
    return <div>Error: Enemy not found. Please return to the previous path.</div>;
  }

  const handleWin = () => {
    alert(`You defeated the ${enemyData.name}!`);
    navigate('/level-one/crossroads');
  };

  return (
    <div>
      <h2>Encounter: {enemyData.name}</h2>
      <p>
        As you move through the {enemy === 'forest' ? 'dark forest' : 'rocky clearing'}, a {enemyData.name} appears!
        It looks ready for a fight.
      </p>
      <ul>
        <li><strong>Health:</strong> {enemyData.health}</li>
        <li><strong>Strength:</strong> {enemyData.strength}</li>
        <li><strong>Dexterity:</strong> {enemyData.dexterity}</li>
        <li><strong>Toughness:</strong> {enemyData.toughness}</li>
        <li><strong>Weapon Skill:</strong> {enemyData.weaponSkill}</li>
      </ul>
      <button onClick={handleWin}>Win the Fight</button>
    </div>
  );
}
