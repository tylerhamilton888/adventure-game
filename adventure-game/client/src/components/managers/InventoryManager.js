const apiUrl = "https://localhost:7201";

// Fetch inventory for a character
export const getInventoryForCharacter = (characterId) => {
  return fetch(`${apiUrl}/api/inventory/character/${characterId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch inventory");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching inventory:", error);
    });
};

// Equip an item for a character
export const equipItem = (characterId, itemId) => {
  return fetch(`${apiUrl}/api/inventory/equip`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ characterId, itemId }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((data) => ({ success: false, message: data.message }));
      }
      return { success: true };
    })
    .catch((error) => {
      console.error("Error equipping item:", error);
      return { success: false, message: "Failed to equip item" };
    });
};

// Unequip an item for a character
export const unequipItem = (characterId, itemId) => {
  return fetch(`${apiUrl}/api/inventory/unequip`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ characterId, itemId }),
  })
    .then((response) => {
      if (!response.ok) {
        return { success: false };
      }
      return { success: true };
    })
    .catch((error) => {
      console.error("Error unequipping item:", error);
      return { success: false, message: "Failed to unequip item" };
    });
};