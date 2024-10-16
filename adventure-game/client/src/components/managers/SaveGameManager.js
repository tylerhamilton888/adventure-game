const apiUrl = "https://localhost:7201";

// Save a game
export const saveGame = async (saveData) => {
  return fetch(`${apiUrl}/api/savegame`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(saveData),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((data) => ({ success: false, message: data.message }));
      }
      return { success: true };
    })
    .catch((error) => {
      console.error("Error saving game:", error);
      return { success: false, message: "Failed to save game." };
    });
};

// Fetch saved games for a user
export const getSavedGames = async (userId) => {
  return fetch(`${apiUrl}/api/savegame/user/${userId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch saved games.");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching saved games:", error);
      return [];
    });
};