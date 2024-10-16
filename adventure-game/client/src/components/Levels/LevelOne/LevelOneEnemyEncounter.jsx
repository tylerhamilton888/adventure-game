import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCombatSystem } from '../../UseCombatSystem';
import IntegratedNavigation from '../../IntegratedNavigation.jsx';

const ENEMIES = {
  forest: {
    name: 'Orc Marauder',
    health: 15,
    strength: 10,
    dexterity: 8,
    toughness: 5,
    weaponSkill: 5,
  },
  clearing: {
    name: 'Bandit Leader',
    health: 10,
    strength: 5,
    dexterity: 10,
    toughness: 8,
    weaponSkill: 6,
  },
};

export default function LevelOneEnemyEncounter() {
  const { enemy } = useParams();
  const navigate = useNavigate();
  const enemyData = ENEMIES[enemy];

  if (!enemyData) {
    return <div>Error: Enemy not found. Please return to the previous path.</div>;
  }

  const selectedCharacter = JSON.parse(localStorage.getItem('selectedCharacter'));

  const player = {
    ...selectedCharacter,
    hasShield: selectedCharacter.hasShield || false,
    isDefensive: false,
  };

  const { player: currentPlayer, enemy: currentEnemy, combatMessage, playerAttack, combatEnded } = useCombatSystem(
    player,
    enemyData
  );

  const handleAttack = (aggressive) => {
    playerAttack(aggressive);
  };

  const handleWin = () => {
    alert(`You defeated the ${enemyData.name}!`);
    navigate('/level-one/crossroads');
  };

  const handleDeath = () => {
    if (window.confirm('You have been defeated, but the gods are merciful. Try this adventure again?')) {
      navigate(`/level-one/intro`);
    } else {
      navigate(`/home`);
    }
  };

  return (
    <div>
      <h2>Encounter: {enemyData.name}</h2>
      <p>
        As you move through the {enemy === 'forest' ? 'dark forest' : 'rocky clearing'}, a {enemyData.name} appears!
        It looks ready for a fight.
      </p>
      <ul>
        <li><strong>Health:</strong> {currentEnemy.health}</li>
        <li><strong>Strength:</strong> {currentEnemy.strength}</li>
        <li><strong>Dexterity:</strong> {currentEnemy.dexterity}</li>
        <li><strong>Toughness:</strong> {currentEnemy.toughness}</li>
        <li><strong>Weapon Skill:</strong> {currentEnemy.weaponSkill}</li>
      </ul>
      <ul>
        <li><strong>Player Health:</strong> {currentPlayer.health}</li>
      </ul>
      {!combatEnded && (
        <>
          <button onClick={() => handleAttack(true)}>Aggressive Attack</button>
          <button onClick={() => handleAttack(false)}>Defensive Attack</button>
        </>
      )}

      <p>{combatMessage}</p>

      {combatEnded && currentEnemy.health <= 0 && (
        <button onClick={handleWin}>Proceed to the Crossroads</button>
      )}
      {combatEnded && currentPlayer.health <= 0 && (
        <button onClick={handleDeath}>Restart Level</button>
      )}

      <IntegratedNavigation currentPath={window.location.pathname} />
    </div>
  );
}
