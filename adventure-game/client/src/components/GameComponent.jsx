import React, { useEffect, useState } from "react";

export default function GameComponent() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    // Retrieve selected character from localStorage
    const storedCharacter = localStorage.getItem("selectedCharacter");
    if (storedCharacter) {
      setSelectedCharacter(JSON.parse(storedCharacter));
    }
  }, []);

  if (!selectedCharacter) {
    return <div>Please select a character to start the game.</div>;
  }

  return (
    <div>
      <h1>Welcome, {selectedCharacter.name}</h1>
      <p>Class: {selectedCharacter.className}</p>
      <p>Health: {selectedCharacter.health}</p>
      {/* Add more details or logic based on the selected character */}
    </div>
  );
}
