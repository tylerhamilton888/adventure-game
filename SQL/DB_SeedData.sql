-- Users (including admin)
INSERT INTO [users] (id, username, email, password, isAdmin)
VALUES
(1, 'thorvald', 'thorvald@example.com', 'password123', 1), -- Admin user
(2, 'eliora', 'eliora@example.com', 'swordandshield', 0),  -- Normal user
(3, 'valmir', 'valmir@example.com', 'heavydrinker', 0);    -- Normal user

-- Classes
INSERT INTO [classes] (id, className)
VALUES
(1, 'Warrior'),
(2, 'Berserker'),
(3, 'Archer'),
(4, 'Mage');

-- Origins
INSERT INTO [origins] (id, originName)
VALUES
(1, 'Norseman'),
(2, 'Celtic'),
(3, 'Elf'),
(4, 'Dwarf');

-- Default Characters (Available to everyone)
INSERT INTO [characters] (id, userId, name, class, origin, health, strength, dexterity, charisma, weaponSkill, toughness, money, isDefault)
VALUES
(1, NULL, 'Bjorn the Brave', 1, 1, 100, 15, 12, 10, 14, 16, 50, 1), -- isDefault = 1 (TRUE)
(2, NULL, 'Aeronwen', 3, 2, 85, 10, 18, 14, 12, 10, 40, 1),         -- isDefault = 1 (TRUE)
(3, NULL, 'Grunthor', 2, 4, 120, 18, 10, 8, 16, 20, 75, 1);         -- isDefault = 1 (TRUE)

-- Custom Characters (Linked to users)
INSERT INTO [characters] (id, userId, name, class, origin, health, strength, dexterity, charisma, weaponSkill, toughness, money, isDefault)
VALUES
(4, 1, 'Thorvald Custom', 1, 1, 95, 13, 14, 10, 15, 14, 60, 0),     -- isDefault = 0 (FALSE)
(5, 2, 'Eliora Custom', 3, 2, 90, 12, 17, 13, 13, 11, 50, 0);       -- isDefault = 0 (FALSE)

-- ItemType (Weapons, Shields, Armor)
INSERT INTO [itemType] (id, typeName)
VALUES
(1, 'Weapon'),
(2, 'Shield'),
(3, 'Armor');

-- Items (using correct type values from itemType table)
INSERT INTO [items] (id, name, type, strengthModifier, dexterityModifier, charismaModifier, toughnessModifier, equippable, isTwoHanded)
VALUES
(1, 'Iron Sword', 1, 5, 0, 0, 0, 1, 0), -- One-handed weapon
(2, 'Steel Shield', 2, 0, 0, 0, 5, 1, 0), -- One-handed shield
(3, 'Great Axe', 1, 10, 0, 0, 0, 1, 1), -- Two-handed weapon (isTwoHanded = 1)
(4, 'Leather Armor', 3, 0, 0, 0, 3, 1, 0); -- Armor, not applicable for isTwoHanded

-- InventoryItems (Linking characters to items)
INSERT INTO [inventoryItems] (id, characterId, itemId, equipped)
VALUES
(1, 1, 1, 1), -- Bjorn equips Iron Sword (itemId = 1)
(2, 1, 2, 1), -- Bjorn equips Steel Shield (itemId = 2)
(3, 2, 3, 1); -- Aeronwen equips Great Axe (itemId = 3)

-- Enemies (Monsters, bandits, etc.)
INSERT INTO [enemies] (id, name, health, strength, dexterity, toughness, weaponskill)
VALUES
(1, 'Orc Marauder', 80, 12, 8, 10, 10),
(2, 'Troll', 150, 18, 5, 20, 12),
(3, 'Bandit Leader', 100, 14, 12, 12, 14);

-- Levels (Game levels)
INSERT INTO [levels] (id, name, url)
VALUES
(1, 'Forest of Shadows', 'levels/forest_of_shadows'),
(2, 'Cavern of Despair', 'levels/cavern_of_despair'),
(3, 'Fortress of the Iron King', 'levels/fortress_of_iron_king');

-- SaveGames (Tracking progress)
INSERT INTO [saveGames] (id, saveGameName, userId, characterId, onLevel)
VALUES
(1, 'Bjorn Forest Save', 1, 1, 1),
(2, 'Aeronwen Cavern Save', 2, 2, 2),
(3, 'Grunthor Fortress Save', 3, 3, 3);
