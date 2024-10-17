import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../Login.jsx';
import Home from '../Home.jsx';
import Register from '../Register.jsx';
import CharacterForm from '../Characters/CharacterForm.jsx';
import CharacterSelector from '../Characters/CharacterSelector.jsx';
import Inventory from '../Inventory.jsx';
import MyCharacter from '../MyCharacter.jsx';
import LevelOneIntro from '../Levels/LevelOne/LevelOneIntro.jsx';
import LevelOneArmory from '../Levels/LevelOne/LevelOneArmory.jsx';
import LevelOneEnemyEncounter from '../Levels/LevelOne/LevelOneEnemyEncounter.jsx';
import LevelOneCrossroads from '../Levels/LevelOne/LevelOneCrossroads.jsx';
import LevelSelection from '../LevelSelection.jsx';
import CombatExplanation from '../CombatExplanation.jsx';
import MySavedGames from '../MySavedGames.jsx';
import LevelOneAxeDiscovery from '../Levels/LevelOne/LevelOneAxeDiscovery.jsx';
import LevelOneNewLocation from '../Levels/LevelOne/LevelOneNewLocation.jsx';
import LevelOneRewardScreen from '../Levels/LevelOne/LevelOneRewardScreen.jsx';
import LevelOneGoblinEncounter from '../Levels/LevelOne/LevelOneGoblinEncounter.jsx';

export default function ApplicationViews({ isLoggedIn, setIsLoggedIn }) {
  const userProfile = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : null;
  const userId = userProfile?.id;

  return (
    <Routes>
      {isLoggedIn ? (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/create-character" element={<CharacterForm />} />
          <Route path="/select-character" element={<CharacterSelector userId={userId} />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/my-character" element={<MyCharacter />} />
          <Route path="/combat-explanation" element={<CombatExplanation />} />
          <Route path="/saved-games" element={<MySavedGames userId={userId} />} />
          <Route path="/home" element={<Home userId={userId} />} />
          
          {/* Level One Routes */}
          <Route path="/level-one/intro" element={<LevelOneIntro />} />
          <Route path="/level-one/armory" element={<LevelOneArmory />} />
          <Route path="/level-one/encounter/:enemy" element={<LevelOneEnemyEncounter />} />
          <Route path="/level-one/crossroads" element={<LevelOneCrossroads />} />
          <Route path="/level-one/axe-discovery" element={<LevelOneAxeDiscovery />} />
          <Route path="/level-one/new-location" element={<LevelOneNewLocation />} />
          <Route path="/level-one/reward-screen" element={<LevelOneRewardScreen />} />
          <Route path="level-one/goblin-encounter" element={<LevelOneGoblinEncounter />} />
          
          {/* Level Selection */}
          <Route path="/level-selection" element={<LevelSelection />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        </>
      )}
    </Routes>
  );
}
