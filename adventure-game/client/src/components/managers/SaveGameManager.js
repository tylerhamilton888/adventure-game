const apiUrl = "https://localhost:7201"; 

// Fetch saved games for a user
export const getSavedGames = async (userId) => {
  try {
    const response = await fetch(`${apiUrl}/api/savegame/user/${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch saved games');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching saved games:', error);
    return []; // Return an empty list if an error occurs
  }
};

// Save or update a saved game
export const saveGame = async (saveGame) => {
  try {
    const response = await fetch(`${apiUrl}/api/savegame/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(saveGame),
    });

    if (!response.ok) {
      throw new Error('Failed to save game');
    }
    return await response.json();
  } catch (error) {
    console.error('Error saving game:', error);
    return null; // Return null if an error occurs
  }
};

// Delete a saved game
export const deleteSavedGame = async (saveGameId) => {
  try {
    const response = await fetch(`${apiUrl}/api/savegame/${saveGameId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete saved game');
    }
    return { success: true };
  } catch (error) {
    console.error('Error deleting saved game:', error);
    return { success: false };
  }
};

// Save game handler for navbar
export const saveGameHandler = async () => {
  const selectedCharacter = JSON.parse(localStorage.getItem('selectedCharacter'));
  const userProfile = JSON.parse(localStorage.getItem('userProfile'));

  if (!selectedCharacter || !userProfile) {
    console.error('No character or user selected for saving');
    return;
  }

  const saveData = {
    saveGameName: `${selectedCharacter.name}'s Save`,
    userId: userProfile.id,
    characterId: selectedCharacter.id,
    onLevel: localStorage.getItem('currentLevel') || 1,
  };

  const result = await saveGame(saveData);

  if (result) {
    console.log('Game saved successfully');
  } else {
    console.error('Failed to save game');
  }
};