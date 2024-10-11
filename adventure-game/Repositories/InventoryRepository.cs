using adventure_game.Models;
using adventure_game.Utils;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;

namespace adventure_game.Repositories
{
    public class InventoryRepository : BaseRepository, IInventoryRepository
    {
        public InventoryRepository(IConfiguration configuration) : base(configuration) { }

        public List<InventoryItem> GetInventoryByCharacterId(int characterId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT i.id, i.name, it.typeName, i.strengthModifier, i.dexterityModifier, i.charismaModifier,
                               i.toughnessModifier, i.equippable, i.isTwoHanded
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
                            IsTwoHanded = DbUtils.GetBoolean(reader, "isTwoHanded")
                        });
                    }

                    reader.Close();
                    return inventoryItems;
                }
            }
        }
    }
}
