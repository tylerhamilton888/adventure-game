using adventure_game.Models;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;

namespace adventure_game.Repositories
{
    public class InventoryRepository : BaseRepository, IInventoryRepository
    {
        public InventoryRepository(IConfiguration configuration) : base(configuration) { }

        public InventoryItem GetInventoryItem(int inventoryItemId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT i.id, i.name, it.typeName, i.strengthModifier, i.dexterityModifier, i.charismaModifier,
                               i.toughnessModifier, i.equippable, i.isTwoHanded, ii.equipped
                        FROM InventoryItems ii
                        JOIN Items i ON ii.itemId = i.id
                        JOIN ItemType it ON i.type = it.id
                        WHERE ii.id = @inventoryItemId";
                    cmd.Parameters.AddWithValue("@inventoryItemId", inventoryItemId);

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        return new InventoryItem
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("id")),
                            Name = reader.GetString(reader.GetOrdinal("name")),
                            TypeName = reader.GetString(reader.GetOrdinal("typeName")),
                            StrengthModifier = reader.GetInt32(reader.GetOrdinal("strengthModifier")),
                            DexterityModifier = reader.GetInt32(reader.GetOrdinal("dexterityModifier")),
                            CharismaModifier = reader.GetInt32(reader.GetOrdinal("charismaModifier")),
                            ToughnessModifier = reader.GetInt32(reader.GetOrdinal("toughnessModifier")),
                            Equippable = reader.GetBoolean(reader.GetOrdinal("equippable")),
                            IsTwoHanded = reader.GetBoolean(reader.GetOrdinal("isTwoHanded")),
                            Equipped = reader.GetBoolean(reader.GetOrdinal("equipped"))
                        };
                    }
                    reader.Close();
                    return null;
                }
            }
        }

        public void DeleteInventoryItem(int inventoryItemId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM InventoryItems WHERE id = @inventoryItemId";
                    cmd.Parameters.AddWithValue("@inventoryItemId", inventoryItemId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<InventoryItem> GetInventoryByCharacterId(int characterId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT ii.id, i.name, it.typeName, i.strengthModifier, i.dexterityModifier, i.charismaModifier,
                               i.toughnessModifier, i.equippable, i.isTwoHanded, ii.equipped
                        FROM InventoryItems ii
                        JOIN Items i ON ii.itemId = i.id
                        JOIN ItemType it ON i.type = it.id
                        WHERE ii.characterId = @characterId";
                    cmd.Parameters.AddWithValue("@characterId", characterId);

                    var reader = cmd.ExecuteReader();
                    var inventoryItems = new List<InventoryItem>();

                    while (reader.Read())
                    {
                        inventoryItems.Add(new InventoryItem
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("id")),
                            Name = reader.GetString(reader.GetOrdinal("name")),
                            TypeName = reader.GetString(reader.GetOrdinal("typeName")),
                            StrengthModifier = reader.GetInt32(reader.GetOrdinal("strengthModifier")),
                            DexterityModifier = reader.GetInt32(reader.GetOrdinal("dexterityModifier")),
                            CharismaModifier = reader.GetInt32(reader.GetOrdinal("charismaModifier")),
                            ToughnessModifier = reader.GetInt32(reader.GetOrdinal("toughnessModifier")),
                            Equippable = reader.GetBoolean(reader.GetOrdinal("equippable")),
                            IsTwoHanded = reader.GetBoolean(reader.GetOrdinal("isTwoHanded")),
                            Equipped = reader.GetBoolean(reader.GetOrdinal("equipped"))
                        });
                    }
                    reader.Close();
                    return inventoryItems;
                }
            }
        }

        public bool EquipItem(int inventoryItemId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    // Get the item to be equipped and check if it's one-handed or two-handed
                    cmd.CommandText = @"
                SELECT i.isTwoHanded, ii.characterId
                FROM InventoryItems ii
                JOIN Items i ON ii.itemId = i.id
                WHERE ii.id = @inventoryItemId";

                    cmd.Parameters.AddWithValue("@inventoryItemId", inventoryItemId);
                    var reader = cmd.ExecuteReader();

                    bool isTwoHanded = false;
                    int characterId = 0;

                    if (reader.Read())
                    {
                        isTwoHanded = reader.GetBoolean(reader.GetOrdinal("isTwoHanded"));
                        characterId = reader.GetInt32(reader.GetOrdinal("characterId"));
                    }
                    reader.Close();

                    // Check how many hands are currently occupied
                    cmd.CommandText = @"
                SELECT ISNULL(SUM(CASE WHEN i.isTwoHanded = 1 THEN 2 ELSE 1 END), 0) as handCount
                FROM InventoryItems ii
                JOIN Items i ON ii.itemId = i.id
                WHERE ii.characterId = @characterId AND ii.equipped = 1";

                    cmd.Parameters.Clear();
                    cmd.Parameters.AddWithValue("@characterId", characterId);
                    int handCount = (int)cmd.ExecuteScalar();

                    // Prevent equipping if hands are full
                    if (handCount >= 2 || (isTwoHanded && handCount > 0))
                    {
                        return false; // Cannot equip this item
                    }

                    // Equip the item
                    cmd.CommandText = @"
                UPDATE InventoryItems
                SET equipped = 1
                WHERE id = @inventoryItemId";

                    cmd.Parameters.Clear();
                    cmd.Parameters.AddWithValue("@inventoryItemId", inventoryItemId);
                    return cmd.ExecuteNonQuery() > 0;
                }
            }
        }

        public bool UnequipItem(int inventoryItemId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "UPDATE InventoryItems SET equipped = 0 WHERE id = @inventoryItemId";
                    cmd.Parameters.AddWithValue("@inventoryItemId", inventoryItemId);

                    return cmd.ExecuteNonQuery() > 0;
                }
            }
        }

        public bool AddItemToInventory(int characterId, int itemId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    // Get the next available ID for inventoryItems
                    cmd.CommandText = "SELECT ISNULL(MAX(id), 0) + 1 FROM InventoryItems";
                    int nextId = (int)cmd.ExecuteScalar();

                    // Insert the new item into inventory
                    cmd.CommandText = "INSERT INTO InventoryItems (id, characterId, itemId, equipped) VALUES (@id, @characterId, @itemId, 0)";
                    cmd.Parameters.AddWithValue("@id", nextId);
                    cmd.Parameters.AddWithValue("@characterId", characterId);
                    cmd.Parameters.AddWithValue("@itemId", itemId);

                    return cmd.ExecuteNonQuery() > 0;
                }
            }
        }
    }
}
