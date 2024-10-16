export class CombatSystem {
    constructor(player, enemy) {
      this.player = player;
      this.enemy = enemy;
    }
  
    rollDie(sides) {
      return Math.floor(Math.random() * sides) + 1;
    }
  
    decideAttacker() {
      const playerRoll = this.rollDie(20);
      const enemyRoll = this.rollDie(20);
  
      if (playerRoll > enemyRoll) {
        return 'player';
      } else if (enemyRoll > playerRoll) {
        return 'enemy';
      } else {
        if (this.player.weaponSkill > this.enemy.weaponSkill) {
          return 'player';
        } else if (this.enemy.weaponSkill > this.player.weaponSkill) {
          return 'enemy';
        } else {
          return Math.random() < 0.5 ? 'player' : 'enemy';
        }
      }
    }
  
    calculateDamage(attacker, defender, aggressive) {
      const baseDamage = this.rollDie(6) + attacker.strength;
      const modifiedStrength = aggressive ? attacker.strength + 5 : attacker.strength;
      const toughnessModifier = defender.toughness + (defender.isDefensive ? 5 : 0);
      return Math.max(baseDamage + (aggressive ? 5 : 0) - toughnessModifier, 1);
    }
  
    playerTurn(aggressive) {
      const attacker = this.decideAttacker();
      if (attacker === 'player') {
        const damage = this.calculateDamage(this.player, this.enemy, aggressive);
        this.enemy.health -= damage;
        return `You attack the ${this.enemy.name} and deal ${damage} damage!`;
      } else {
        return `You tried to attack, but the ${this.enemy.name} reacted first!`;
      }
    }
  
    enemyTurn() {
      const attacker = this.decideAttacker();
      if (attacker === 'enemy') {
        // Block chance if player has a shield
        if (this.player.hasShield) {
          const blockChance = this.player.dexterity;
          const blockRoll = Math.random() * 100;
          if (blockRoll <= blockChance) {
            return `You block the enemy attack, avoiding ${this.enemy.strength} damage! (Block Roll: ${blockRoll.toFixed(2)} / Chance: ${blockChance.toFixed(2)}).`;
          }
        }
  
        const damage = this.calculateDamage(this.enemy, this.player, false);
        this.player.health -= damage;
        return `The ${this.enemy.name} attacks and deals ${damage} damage to you!`;
      } else {
        return `The ${this.enemy.name} tried to attack, but you reacted first!`;
      }
    }
  
    isPlayerAlive() {
      return this.player.health > 0;
    }
  
    isEnemyAlive() {
      return this.enemy.health > 0;
    }
  }
  