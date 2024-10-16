import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveGame, getSavedGames } from './managers/SaveGameManager';

export default function MySavedGames() {
  const [savedGames, setSavedGames] = useState([]);
  const navigate = useNavigate();
  const currentCharacter = JSON.parse(localStorage.getItem('selectedCharacter'));
  const currentLevel = JSON.parse(localStorage.getItem('currentLevel'));

  useEffect(() => {
    updateSavedGames();
  }, []);

  const updateSavedGames = async () => {
    if (!currentCharacter || !currentCharacter.userId) {
      console.error("No user is currently logged in.");
      return;
    }
    try {
      const games = await getSavedGames(currentCharacter.userId);
      setSavedGames(games);
    } catch (error) {
      console.error('Failed to update saved games:', error);
    }
  };

  const handleSaveProgress = async () => {
    if (!currentCharacter || !currentLevel) {
      console.error("Character or level not available for saving.");
      return;
    }

    try {
      const saveData = {
        saveGameName: `Save from ${new Date().toLocaleString()}`,
        userId: currentCharacter.userId,
        characterId: currentCharacter.id,
        onLevel: currentLevel
      };

      const response = await saveGame(saveData);
      if (response.success) {
        alert('Game progress saved successfully!');
        updateSavedGames();
      } else {
        throw new Error(response.message || 'Failed to save game progress.');
      }
    } catch (error) {
      console.error('Error saving game:', error);
    }
  };

  const handleLoadSavedGame = (game) => {
    localStorage.setItem('selectedCharacter', JSON.stringify({ id: game.characterId, userId: game.userId }));
    localStorage.setItem('currentLevel', game.onLevel);
    navigate(`/level-${game.onLevel}`);
  };

  return (
    <div>
      <h2>My Saved Games</h2>
      <button onClick={handleSaveProgress}>Save Progress</button>
      <ul>
        {savedGames.map((game) => (
          <li key={game.id}>
            <p><strong>{game.saveGameName}</strong> - Level {game.onLevel}</p>
            <button onClick={() => handleLoadSavedGame(game)}>Load Game</button>
          </li>
        ))}
      </ul>
    </div>
  );
}