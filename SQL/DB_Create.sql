-- Create Users Table
CREATE TABLE [users] (
  [id] int PRIMARY KEY,
  [username] nvarchar(255),
  [email] nvarchar(255),
  [password] nvarchar(255),
  [isAdmin] bit -- TRUE (1) for admins, FALSE (0) for regular users
)
GO

-- Create Classes Table
CREATE TABLE [classes] (
  [id] int PRIMARY KEY,
  [className] nvarchar(255)
)
GO

-- Create Origins Table
CREATE TABLE [origins] (
  [id] int PRIMARY KEY,
  [originName] nvarchar(255)
)
GO

-- Create ItemType Table (for item categories)
CREATE TABLE [itemType] (
  [id] int PRIMARY KEY,
  [typeName] nvarchar(255)
)
GO

-- Create Items Table (includes isTwoHanded column)
CREATE TABLE [items] (
  [id] int PRIMARY KEY,
  [name] nvarchar(255),
  [type] int,
  [strengthModifier] int,
  [dexterityModifier] int,
  [charismaModifier] int,
  [toughnessModifier] int,
  [equippable] bit, -- TRUE (1) for equippable items
  [isTwoHanded] bit, -- TRUE (1) for two-handed weapons
  FOREIGN KEY ([type]) REFERENCES [itemType] ([id])
)
GO

-- Create Characters Table (includes default and custom characters)
CREATE TABLE [characters] (
  [id] int PRIMARY KEY,
  [userId] int,
  [name] nvarchar(255),
  [class] int,
  [origin] int,
  [health] int,
  [strength] int,
  [dexterity] int,
  [charisma] int,
  [weaponSkill] int,
  [toughness] int,
  [money] int,
  [isDefault] bit, -- TRUE (1) for default characters, FALSE (0) for custom ones
  FOREIGN KEY ([userId]) REFERENCES [users] ([id]),
  FOREIGN KEY ([class]) REFERENCES [classes] ([id]),
  FOREIGN KEY ([origin]) REFERENCES [origins] ([id])
)
GO

-- Create InventoryItems Table
CREATE TABLE [inventoryItems] (
  [id] int PRIMARY KEY,
  [characterId] int,
  [itemId] int,
  [equipped] bit, -- TRUE (1) if the item is equipped
  FOREIGN KEY ([characterId]) REFERENCES [characters] ([id]),
  FOREIGN KEY ([itemId]) REFERENCES [items] ([id])
)
GO

-- Create Enemies Table
CREATE TABLE [enemies] (
  [id] int PRIMARY KEY,
  [name] nvarchar(255),
  [health] int,
  [strength] int,
  [dexterity] int,
  [toughness] int,
  [weaponskill] int
)
GO

-- Create Levels Table
CREATE TABLE [levels] (
  [id] int PRIMARY KEY,
  [name] nvarchar(255),
  [url] nvarchar(255)
)
GO

-- Create SaveGames Table
CREATE TABLE [saveGames] (
  [id] int PRIMARY KEY,
  [saveGameName] nvarchar(255),
  [userId] int,
  [characterId] int,
  [onLevel] int,
  FOREIGN KEY ([userId]) REFERENCES [users] ([id]),
  FOREIGN KEY ([characterId]) REFERENCES [characters] ([id]),
  FOREIGN KEY ([onLevel]) REFERENCES [levels] ([id])
)
GO
