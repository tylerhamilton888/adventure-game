import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCombatSystem } from '../../UseCombatSystem';
import IntegratedNavigation from '../../IntegratedNavigation.jsx';

// Component for encountering the Goblin Scout
const LevelOneGoblinEncounter = () => {
  const navigate = useNavigate();

  const enemyData = {
    name: 'Goblin Scout',
    health: 20,
    strength: 4,
    dexterity: 12,
    toughness: 4,
    weaponSkill: 3,
  };

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
    navigate('/level-one/reward-screen');
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
        As you proceed further into the clearing, a Goblin Scout jumps out of the shadows, brandishing a crude spear.
        It snarls at you and prepares for an attack.
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
        <button onClick={handleWin}>Proceed to the Reward Screen</button>
      )}
      {combatEnded && currentPlayer.health <= 0 && (
        <button onClick={handleDeath}>Restart Level</button>
      )}

      <IntegratedNavigation currentPath={window.location.pathname} />
    </div>
  );
};

export default LevelOneGoblinEncounter;
