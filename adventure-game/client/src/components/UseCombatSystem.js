import { useState } from "react";
import { CombatSystem } from "./CombatSystem";


export const useCombatSystem = (initialPlayer, initialEnemy) => {
    const [player, setPlayer] = useState(initialPlayer);
    const [enemy, setEnemy] = useState(initialEnemy);
    const [combatMessage, setCombatMessage] = useState("");
    const [combatEnded, setCombatEnded] = useState(false);
  
    const combatSystem = new CombatSystem(player, enemy);
  
    const playerAttack = (aggressive = false) => {
      if (!combatEnded && combatSystem.isEnemyAlive()) {
        // Player's turn
        const playerAttackResult = combatSystem.playerTurn(aggressive);
        setEnemy((prev) => ({ ...prev, health: combatSystem.enemy.health }));
  
        // Check if enemy is still alive
        if (!combatSystem.isEnemyAlive()) {
          setCombatEnded(true);
          setCombatMessage(`Enemy Slain: ${combatSystem.enemy.name} has been defeated.`);
          return;
        }
  
        // Enemy's turn
        const enemyAttackResult = combatSystem.enemyTurn();
        setPlayer((prev) => ({ ...prev, health: combatSystem.player.health }));
  
        // Set the combat message to reflect both player and enemy actions
        setCombatMessage(`${playerAttackResult} ${enemyAttackResult}`);
  
        // Check if player is still alive
        if (!combatSystem.isPlayerAlive()) {
          setCombatEnded(true);
        }
      }
    };
  
    return { player, enemy, combatMessage, playerAttack, combatEnded };
  };
  