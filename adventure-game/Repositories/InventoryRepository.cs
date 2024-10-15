using adventure_game.Models;
using adventure_game.Utils;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;

namespace adventure_game.Repositories
{
    public class InventoryRepository : BaseRepository, IInventoryRepository
    {
        public InventoryRepository(IConfiguration configuration) : base(configuration) { }

        // Get inventory for a character
        public List<InventoryItem> GetInventoryByCharacterId(int characterId)
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
                        WHERE ii.characterId = @characterId";

                    cmd.Parameters.AddWithValue("@characterId", characterId);

                    var reader = cmd.ExecuteReader();

                    var inventoryItems = new List<InventoryItem>();

                    while (reader.Read())
                    {
                        inventoryItems.Add(new InventoryItem()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            Name = DbUtils.GetString(reader, "name"),
                            TypeName = DbUtils.GetString(reader, "typeName"),
                            StrengthModifier = DbUtils.GetInt(reader, "strengthModifier"),
                            DexterityModifier = DbUtils.GetInt(reader, "dexterityModifier"),
                            CharismaModifier = DbUtils.GetInt(reader, "charismaModifier"),
                            ToughnessModifier = DbUtils.GetInt(reader, "toughnessModifier"),
                            Equippable = DbUtils.GetBoolean(reader, "equippable"),
                            IsTwoHanded = DbUtils.GetBoolean(reader, "isTwoHanded"),
                            Equipped = DbUtils.GetBoolean(reader, "equipped")
                        });
                    }

                    reader.Close();
                    return inventoryItems;
                }
            }
        }

        // Equip an item for a character
        public bool EquipItem(int characterId, int itemId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    // Check if the item is armor or not
                    cmd.CommandText = @"
                SELECT it.typeName, i.isTwoHanded 
                FROM Items i
                JOIN ItemType it ON i.type = it.id
                WHERE i.id = @itemId";

                    cmd.Parameters.AddWithValue("@itemId", itemId);
                    var reader = cmd.ExecuteReader();

                    bool isArmor = false;
                    bool isTwoHanded = false;
                    if (reader.Read())
                    {
                        var typeName = reader.GetString(reader.GetOrdinal("typeName"));
                        isArmor = typeName == "Armor";
                        isTwoHanded = reader.GetBoolean(reader.GetOrdinal("isTwoHanded"));
                    }
                    reader.Close();

                    // If it is armor, equip without checking limits
                    if (isArmor)
                    {
                        cmd.CommandText = @"
                    UPDATE InventoryItems
                    SET equipped = 1
                    WHERE characterId = @characterId AND itemId = @itemId";

                        cmd.Parameters.Clear();
                        cmd.Parameters.AddWithValue("@characterId", characterId);
                        cmd.Parameters.AddWithValue("@itemId", itemId);

                        return cmd.ExecuteNonQuery() > 0;
                    }

                    // Otherwise, check if hands are full
                    cmd.CommandText = @"
                SELECT SUM(CASE WHEN i.isTwoHanded = 1 THEN 2 ELSE 1 END) as handCount
                FROM InventoryItems ii
                JOIN Items i ON ii.itemId = i.id
                JOIN ItemType it ON i.type = it.id
                WHERE ii.characterId = @characterId AND ii.equipped = 1 AND it.typeName != 'Armor'";

                    cmd.Parameters.Clear();
                    cmd.Parameters.AddWithValue("@characterId", characterId);

                    var equippedCountReader = cmd.ExecuteReader();
                    int handCount = 0;

                    if (equippedCountReader.Read())
                    {
                        handCount = equippedCountReader.IsDBNull(equippedCountReader.GetOrdinal("handCount")) ? 0 : equippedCountReader.GetInt32(equippedCountReader.GetOrdinal("handCount"));
                    }
                    equippedCountReader.Close();

                    // If hands are full, return false
                    if (handCount >= 2 || (isTwoHanded && handCount > 0))
                    {
                        return false; // Player cannot equip more than two hands' worth of items
                    }

                    // Equip the item
                    cmd.CommandText = @"
                UPDATE InventoryItems
                SET equipped = 1
                WHERE characterId = @characterId AND itemId = @itemId";

                    cmd.Parameters.Clear();
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
    }
}