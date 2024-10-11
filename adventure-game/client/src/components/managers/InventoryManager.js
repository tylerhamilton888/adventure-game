export const getInventoryForCharacter = async (characterId) => {
    const response = await fetch(`https://localhost:7201/api/inventory/character/${characterId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch inventory");
    }
    return await response.json();
  };
  