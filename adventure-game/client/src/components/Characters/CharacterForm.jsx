import React, { useState, useEffect } from "react";
import { getAllClasses, getAllOrigins, createCharacter } from "../managers/CharacterManager";

export default function CharacterForm() {
  const [classes, setClasses] = useState([]);
  const [origins, setOrigins] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [characterName, setCharacterName] = useState("");
  
  // Fetch userProfile from localStorage
  const userId = JSON.parse(localStorage.getItem('userProfile'))?.id;

  // Fetch classes and origins when component mounts
  useEffect(() => {
    getAllClasses()
      .then((res) => {
        setClasses(res);
      })
      .catch((err) => console.error("Failed to fetch classes:", err));

    getAllOrigins()
      .then((res) => {
        setOrigins(res);
      })
      .catch((err) => console.error("Failed to fetch origins:", err));
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Find the selected class and origin names from the dropdowns
    const selectedClassObj = classes.find(c => c.id === parseInt(selectedClass));
    const selectedOriginObj = origins.find(o => o.id === parseInt(selectedOrigin));
  
    const newCharacter = {
      name: characterName,
      classId: parseInt(selectedClass), // Still send classId
      originId: parseInt(selectedOrigin), // Still send originId
      userId: userId, // The ID of the logged-in user
      health: 20,
      strength: 5,
      dexterity: 5,
      charisma: 5,
      weaponSkill: 5,
      toughness: 5,
      money: 5,
      isDefault: false,
      className: selectedClassObj?.className || "", // Add className based on selection
      originName: selectedOriginObj?.originName || "" // Add originName based on selection
    };
  
    createCharacter(newCharacter)
      .then(() => alert("Character created successfully!"))
      .catch((err) => console.error("Failed to create character:", err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Character Name:
        <input
          type="text"
          value={characterName}
          onChange={(e) => setCharacterName(e.target.value)}
          required
        />
      </label>

      <label>
        Select Class:
        <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} required>
          <option value="">Select a class</option>
          {classes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.className}
            </option>
          ))}
        </select>
      </label>

      <label>
        Select Origin:
        <select value={selectedOrigin} onChange={(e) => setSelectedOrigin(e.target.value)} required>
          <option value="">Select an origin</option>
          {origins.map((o) => (
            <option key={o.id} value={o.id}>
              {o.originName}
            </option>
          ))}
        </select>
      </label>

      <button type="submit">Create Character</button>
    </form>
  );
}
