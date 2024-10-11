const apiUrl = "https://localhost:7201";

export const getAllClasses = () => {
  return fetch(`${apiUrl}/api/Classes`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error fetching classes: ${res.status}`);
      }
      return res.json();
    })
    .catch(err => console.error("Failed to fetch classes:", err));
};

export const getAllOrigins = () => {
  return fetch(`${apiUrl}/api/Origins`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error fetching origins: ${res.status}`);
      }
      return res.json();
    })
    .catch(err => console.error("Failed to fetch origins:", err));
};


export const createCharacter = (character) => {
  const userProfile = JSON.parse(localStorage.getItem("userProfile")); // Get logged-in user info
  const userId = userProfile?.id; // Retrieve user ID
  
  // Include userId in the character object
  const characterWithUserId = { ...character, userId };

  return fetch(`${apiUrl}/api/characters`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(characterWithUserId),
  });
};

// Fetch all characters (generic + user-created) for the user
export const getAllCharactersForUser = (userId) => {
  return fetch(`${apiUrl}/api/characters/user/${userId}`)
    .then((res) => res.json())
    .catch((err) => console.error("Failed to fetch characters:", err));
};

export const getGenericCharacters = () => {
  return fetch(`${apiUrl}/api/characters/generic`)
    .then((res) => res.json());
};

export const getCharactersByUserId = (userId) => {
  return fetch(`${apiUrl}/api/characters/user/${userId}`)
    .then((res) => res.json());
};