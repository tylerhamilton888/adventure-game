using adventure_game.Models;
using adventure_game.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace adventure_game.Repositories
{
    public class InventoryRepository : BaseRepository, IInventoryRepository
    {
        public InventoryRepository(IConfiguration configuration) : base(configuration) { }

        // Add an item to character inventory
        public void AddItemToInventory(int characterId, int itemId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO InventoryItems (characterId, itemId, equipped)
                        VALUES (@characterId, @itemId, 0)";

                    cmd.Parameters.AddWithValue("@characterId", characterId);
                    cmd.Parameters.AddWithValue("@itemId", itemId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public bool EquipItem(int characterId, int itemId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE InventoryItems
                        SET equipped = 1
                        WHERE characterId = @characterId AND itemId = @itemId";

                    cmd.Parameters.AddWithValue("@characterId", characterId);
                    cmd.Parameters.AddWithValue("@itemId", itemId);

                    return cmd.ExecuteNonQuery() > 0;
                }
            }
        }

        public bool UnequipItem(int characterId, int itemId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE InventoryItems
                        SET equipped = 0
                        WHERE characterId = @characterId AND itemId = @itemId";

                    cmd.Parameters.AddWithValue("@characterId", characterId);
                    cmd.Parameters.AddWithValue("@itemId", itemId);

                    return cmd.ExecuteNonQuery() > 0;
                }
            }
        }

        public bool RemoveItemFromInventory(int characterId, int itemId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM InventoryItems
                        WHERE characterId = @characterId AND itemId = @itemId";

                    cmd.Parameters.AddWithValue("@characterId", characterId);
                    cmd.Parameters.AddWithValue("@itemId", itemId);

                    return cmd.ExecuteNonQuery() > 0;
                }
            }
        }

        public List<Item> GetInventoryByCharacterId(int characterId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT i.id, i.name, i.type, i.strengthModifier, i.dexterityModifier, i.charismaModifier,
                               i.toughnessModifier, i.equippable, i.isTwoHanded
                        FROM InventoryItems ii
                        JOIN Items i ON ii.itemId = i.id
                        WHERE ii.characterId = @characterId";

                    cmd.Parameters.AddWithValue("@characterId", characterId);

                    var reader = cmd.ExecuteReader();
                    var items = new List<Item>();

                    while (reader.Read())
                    {
                        items.Add(new Item()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            Name = DbUtils.GetString(reader, "name"),
                            Type = DbUtils.GetInt(reader, "type"),
                            StrengthModifier = DbUtils.GetInt(reader, "strengthModifier"),
                            DexterityModifier = DbUtils.GetInt(reader, "dexterityModifier"),
                            CharismaModifier = DbUtils.GetInt(reader, "charismaModifier"),
                            ToughnessModifier = DbUtils.GetInt(reader, "toughnessModifier"),
                            Equippable = DbUtils.GetBoolean(reader, "equippable"),
                            IsTwoHanded = DbUtils.GetBoolean(reader, "isTwoHanded")
                        });
                    }

                    reader.Close();
                    return items;
                }
            }
        }

        public List<Item> GetEquippedItemsByCharacterId(int characterId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT i.id, i.name, i.type, i.strengthModifier, i.dexterityModifier, i.charismaModifier,
                               i.toughnessModifier, i.equippable, i.isTwoHanded
                        FROM InventoryItems ii
                        JOIN Items i ON ii.itemId = i.id
                        WHERE ii.characterId = @characterId AND ii.equipped = 1";

                    cmd.Parameters.AddWithValue("@characterId", characterId);

                    var reader = cmd.ExecuteReader();
                    var items = new List<Item>();

                    while (reader.Read())
                    {
                        items.Add(new Item()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            Name = DbUtils.GetString(reader, "name"),
                            Type = DbUtils.GetInt(reader, "type"),
                            StrengthModifier = DbUtils.GetInt(reader, "strengthModifier"),
                            DexterityModifier = DbUtils.GetInt(reader, "dexterityModifier"),
                            CharismaModifier = DbUtils.GetInt(reader, "charismaModifier"),
                            ToughnessModifier = DbUtils.GetInt(reader, "toughnessModifier"),
                            Equippable = DbUtils.GetBoolean(reader, "equippable"),
                            IsTwoHanded = DbUtils.GetBoolean(reader, "isTwoHanded")
                        });
                    }

                    reader.Close();
                    return items;
                }
            }
        }

        public List<Item> GetUnequippedItemsByCharacterId(int characterId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT i.id, i.name, i.type, i.strengthModifier, i.dexterityModifier, i.charismaModifier,
                               i.toughnessModifier, i.equippable, i.isTwoHanded
                        FROM InventoryItems ii
                        JOIN Items i ON ii.itemId = i.id
                        WHERE ii.characterId = @characterId AND ii.equipped = 0";

                    cmd.Parameters.AddWithValue("@characterId", characterId);

                    var reader = cmd.ExecuteReader();
                    var items = new List<Item>();

                    while (reader.Read())
                    {
                        items.Add(new Item()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            Name = DbUtils.GetString(reader, "name"),
                            Type = DbUtils.GetInt(reader, "type"),
                            StrengthModifier = DbUtils.GetInt(reader, "strengthModifier"),
                            DexterityModifier = DbUtils.GetInt(reader, "dexterityModifier"),
                            CharismaModifier = DbUtils.GetInt(reader, "charismaModifier"),
                            ToughnessModifier = DbUtils.GetInt(reader, "toughnessModifier"),
                            Equippable = DbUtils.GetBoolean(reader, "equippable"),
                            IsTwoHanded = DbUtils.GetBoolean(reader, "isTwoHanded")
                        });
                    }

                    reader.Close();
                    return items;
                }
            }
        }
    }
}