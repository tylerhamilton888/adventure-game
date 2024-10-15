using adventure_game.Models;
using adventure_game.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace adventure_game.Repositories
{
    public class CharactersRepository : BaseRepository, ICharactersRepository
    {
        public CharactersRepository(IConfiguration configuration) : base(configuration) { }

        // Get all generic (default) characters
        public List<Character> GetGenericCharacters()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT c.id, c.name, c.health, c.strength, c.dexterity, c.charisma, c.weaponSkill, c.toughness, c.money, 
                               cl.className, o.originName
                        FROM characters c
                        JOIN Classes cl ON c.classId = cl.id
                        JOIN Origins o ON c.originId = o.id
                        WHERE c.isDefault = 1";

                    var reader = cmd.ExecuteReader();
                    var characters = new List<Character>();

                    while (reader.Read())
                    {
                        characters.Add(new Character()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            Name = DbUtils.GetString(reader, "name"),
                            ClassName = DbUtils.GetString(reader, "className"),
                            OriginName = DbUtils.GetString(reader, "originName"),
                            Health = DbUtils.GetInt(reader, "health"),
                            Strength = DbUtils.GetInt(reader, "strength"),
                            Dexterity = DbUtils.GetInt(reader, "dexterity"),
                            Charisma = DbUtils.GetInt(reader, "charisma"),
                            WeaponSkill = DbUtils.GetInt(reader, "weaponSkill"),
                            Toughness = DbUtils.GetInt(reader, "toughness"),
                            Money = DbUtils.GetInt(reader, "money")
                        });
                    }
                    reader.Close();
                    return characters;
                }
            }
        }

        // Get characters created by a specific user
        public List<Character> GetCharactersByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT c.id, c.name, c.health, c.strength, c.dexterity, c.charisma, c.weaponSkill, c.toughness, c.money, 
                               cl.className, o.originName
                        FROM characters c
                        JOIN Classes cl ON c.classId = cl.id
                        JOIN Origins o ON c.originId = o.id
                        WHERE c.userId = @userId AND c.isDefault = 0";

                    cmd.Parameters.AddWithValue("@userId", userId);

                    var reader = cmd.ExecuteReader();
                    var characters = new List<Character>();

                    while (reader.Read())
                    {
                        characters.Add(new Character()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            Name = DbUtils.GetString(reader, "name"),
                            ClassName = DbUtils.GetString(reader, "className"),
                            OriginName = DbUtils.GetString(reader, "originName"),
                            Health = DbUtils.GetInt(reader, "health"),
                            Strength = DbUtils.GetInt(reader, "strength"),
                            Dexterity = DbUtils.GetInt(reader, "dexterity"),
                            Charisma = DbUtils.GetInt(reader, "charisma"),
                            WeaponSkill = DbUtils.GetInt(reader, "weaponSkill"),
                            Toughness = DbUtils.GetInt(reader, "toughness"),
                            Money = DbUtils.GetInt(reader, "money")
                        });
                    }
                    reader.Close();
                    return characters;
                }
            }
        }

        // Add a new character
        public void AddCharacter(Character character)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    // Generate new ID for character
                    cmd.CommandText = @"SELECT ISNULL(MAX(Id), 0) + 1 FROM Characters";
                    int newId = (int)cmd.ExecuteScalar();

                    // Insert character with default stats
                    cmd.CommandText = @"
                        INSERT INTO Characters (Id, UserId, Name, ClassId, OriginId, Health, Strength, Dexterity, Charisma, WeaponSkill, Toughness, Money, IsDefault)
                        VALUES (@Id, @UserId, @Name, @ClassId, @OriginId, 
                                ISNULL(@Health, 20), ISNULL(@Strength, 5), 
                                ISNULL(@Dexterity, 5), ISNULL(@Charisma, 5), 
                                ISNULL(@WeaponSkill, 5), ISNULL(@Toughness, 5), 
                                ISNULL(@Money, 5), @IsDefault)";

                    cmd.Parameters.AddWithValue("@Id", newId);
                    cmd.Parameters.AddWithValue("@UserId", character.UserId);
                    cmd.Parameters.AddWithValue("@Name", character.Name);
                    cmd.Parameters.AddWithValue("@ClassId", character.ClassId);
                    cmd.Parameters.AddWithValue("@OriginId", character.OriginId);
                    cmd.Parameters.AddWithValue("@Health", character.Health <= 0 ? 20 : character.Health);
                    cmd.Parameters.AddWithValue("@Strength", character.Strength <= 0 ? 5 : character.Strength);
                    cmd.Parameters.AddWithValue("@Dexterity", character.Dexterity <= 0 ? 5 : character.Dexterity);
                    cmd.Parameters.AddWithValue("@Charisma", character.Charisma <= 0 ? 5 : character.Charisma);
                    cmd.Parameters.AddWithValue("@WeaponSkill", character.WeaponSkill <= 0 ? 5 : character.WeaponSkill);
                    cmd.Parameters.AddWithValue("@Toughness", character.Toughness <= 0 ? 5 : character.Toughness);
                    cmd.Parameters.AddWithValue("@Money", character.Money <= 0 ? 5 : character.Money);
                    cmd.Parameters.AddWithValue("@IsDefault", character.IsDefault);

                    cmd.ExecuteNonQuery();

                    character.Id = newId;

                    // Manually generate ID for inventory item
                    cmd.CommandText = @"SELECT ISNULL(MAX(Id), 0) + 1 FROM InventoryItems";
                    int inventoryItemId = (int)cmd.ExecuteScalar();

                    // Insert basic leather armor into character inventory
                    cmd.CommandText = @"
                        INSERT INTO InventoryItems (Id, characterId, itemId, equipped)
                        VALUES (@inventoryItemId, @characterId, @itemId, 0)";

                    cmd.Parameters.Clear();
                    cmd.Parameters.AddWithValue("@inventoryItemId", inventoryItemId);
                    cmd.Parameters.AddWithValue("@characterId", character.Id);
                    cmd.Parameters.AddWithValue("@itemId", 3); // Assuming item ID 3 is the basic leather armor

                    cmd.ExecuteNonQuery();
                }
            }
        }

        // Get a character by ID
        public Character GetCharacterById(int characterId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT c.id, c.name, c.health, c.strength, c.dexterity, c.charisma, c.weaponSkill, c.toughness, c.money, 
                               cl.className, o.originName, c.isDefault
                        FROM characters c
                        JOIN Classes cl ON c.classId = cl.id
                        JOIN Origins o ON c.originId = o.id
                        WHERE c.id = @characterId";

                    cmd.Parameters.AddWithValue("@characterId", characterId);

                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        return new Character()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            Name = DbUtils.GetString(reader, "name"),
                            ClassName = DbUtils.GetString(reader, "className"),
                            OriginName = DbUtils.GetString(reader, "originName"),
                            Health = DbUtils.GetInt(reader, "health"),
                            Strength = DbUtils.GetInt(reader, "strength"),
                            Dexterity = DbUtils.GetInt(reader, "dexterity"),
                            Charisma = DbUtils.GetInt(reader, "charisma"),
                            WeaponSkill = DbUtils.GetInt(reader, "weaponSkill"),
                            Toughness = DbUtils.GetInt(reader, "toughness"),
                            Money = DbUtils.GetInt(reader, "money"),
                            IsDefault = DbUtils.GetBoolean(reader, "isDefault")
                        };
                    }
                    reader.Close();
                    return null;
                }
            }
        }

        // Get all characters for a specific user
        public List<Character> GetAllCharactersForUser(int userId)
        {
            var allCharacters = new List<Character>();
            allCharacters.AddRange(GetGenericCharacters());
            allCharacters.AddRange(GetCharactersByUserId(userId));
            return allCharacters;
        }
    }
}
