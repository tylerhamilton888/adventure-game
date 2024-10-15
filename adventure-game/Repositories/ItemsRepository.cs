using adventure_game.Models;
using adventure_game.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace adventure_game.Repositories
{
    public class ItemsRepository : BaseRepository, IItemsRepository
    {
        public ItemsRepository(IConfiguration configuration) : base(configuration) { }

        // Get all items
        public List<Item> GetAllItems()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT i.id, i.name, i.type, i.strengthModifier, i.dexterityModifier, i.charismaModifier,
                               i.toughnessModifier, i.equippable, i.isTwoHanded, it.typeName
                        FROM Items i
                        JOIN ItemType it ON i.type = it.id";

                    var reader = cmd.ExecuteReader();
                    var items = new List<Item>();

                    while (reader.Read())
                    {
                        items.Add(new Item()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            Name = DbUtils.GetString(reader, "name"),
                            Type = DbUtils.GetInt(reader, "type"), // Corrected to int
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

        // Get items by list of IDs
        public List<Item> GetItemsByIds(List<int> ids)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT i.id, i.name, i.type, i.strengthModifier, i.dexterityModifier, i.charismaModifier,
                               i.toughnessModifier, i.equippable, i.isTwoHanded, it.typeName
                        FROM Items i
                        JOIN ItemType it ON i.type = it.id
                        WHERE i.id IN (" + string.Join(",", ids) + ")";

                    var reader = cmd.ExecuteReader();
                    var items = new List<Item>();

                    while (reader.Read())
                    {
                        items.Add(new Item()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            Name = DbUtils.GetString(reader, "name"),
                            Type = DbUtils.GetInt(reader, "type"), // Corrected to int
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