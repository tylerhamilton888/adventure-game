import React from 'react';

const CombatExplanation = () => {
  return (
    <div className="container explanation-container">
      <h1>Combat Explanation</h1>
      <p>Welcome to the combat system of our adventure game! This guide will help you understand how the combat works so you can make the best choices during each encounter.</p>

      <h3>1. Rolling for Initiative</h3>
      <p>At the start of each combat turn, both you and the enemy roll a 20-sided die (1-20). The higher roll determines who gets to attack first for that turn.</p>
      <p>If both rolls are tied, whoever has the higher Weapon Skill will be the first to attack. If Weapon Skills are also tied, a coin flip (50/50 chance) will decide the attacker.</p>

      <h3>2. Choosing Your Attack Style</h3>
      <p>Each turn, you have the option to choose between an Aggressive Attack or a Defensive Attack:</p>
      <ul className="explanation-list">
        <li><strong>Aggressive Attack:</strong> This boosts your Strength by +5 for the turn, increasing the damage dealt if you successfully hit the enemy.</li>
        <li><strong>Defensive Attack:</strong> This boosts your Toughness by +5 for the turn, helping reduce the damage you take if the enemy attacks successfully.</li>
      </ul>

      <h3>3. Determining the Strike</h3>
      <p>Once the attacker is determined, the attacker rolls for damage. The base damage is calculated as follows:</p>
      <ul className="explanation-list">
        <li>Roll a 6-sided die (1-6) to determine the base damage.</li>
        <li>Add the attacker’s Strength stat to the roll.</li>
        <li>Subtract the defender’s Toughness stat from the total to determine the final damage dealt.</li>
        <li>Damage cannot be less than 1, ensuring that every successful hit does at least 1 point of damage.</li>
      </ul>

      <h3>4. Blocking Attacks</h3>
      <p>If you have a shield equipped, you have a chance to block incoming attacks. The success of a block is determined by a roll against your Dexterity stat:</p>
      <ul className="explanation-list">
        <li>If the block is successful, you completely mitigate all incoming damage for that attack.</li>
        <li>A message will display when you successfully block, indicating the amount of damage avoided.</li>
        <li>This is a powerful boon, if it works...but it comes at the cost of not being able to use the most powerful weapons!</li>
      </ul>

      <h3>5. Combat Messages</h3>
      <p>During combat, you will receive messages detailing what happened during the last turn, such as:</p>
      <ul className="explanation-list">
        <li><strong>You attack the enemy:</strong> Displays the damage dealt, including the roll, Strength, and the enemy's Toughness.</li>
        <li><strong>The enemy attacks you:</strong> Displays the enemy's damage and your Toughness value.</li>
        <li><strong>You block the attack:</strong> If you successfully block, the message will show how much damage you avoided.</li>
      </ul>

      <h3>6. Winning and Losing</h3>
      <p>Combat continues until one side is defeated:</p>
      <ul className="explanation-list">
        <li>If you reduce the enemy's health to 0, you win the fight and can proceed to the next area.</li>
        <li>If your health reaches 0, you are defeated. You will have the option to retry the level or quit to the home screen.</li>
      </ul>

      <h3>7. Strategy Tips</h3>
      <p>Consider using Aggressive Attacks when you are confident in your ability to finish the enemy quickly. Use Defensive Attacks if you want to reduce incoming damage, especially when you’re low on health or facing a strong enemy.</p>
      <p>Always take advantage of your shield if you have one—blocking can be the difference between victory and defeat.</p>

      <h3>Good Luck!</h3>
      <p>Combat in this adventure is all about choosing the right strategy at the right time. Use your character's strengths, watch the enemy's behavior, and emerge victorious!</p>
    </div>
  );
};

export default CombatExplanation;
