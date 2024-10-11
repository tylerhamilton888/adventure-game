using adventure_game.Repositories;
using adventure_game.Models;

public class OriginRepository : BaseRepository, IOriginRepository
{
    public OriginRepository(IConfiguration configuration) : base(configuration) { }

    public List<Origin> GetAllOrigins()
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = "SELECT Id, originName FROM Origins";
                var reader = cmd.ExecuteReader();
                List<Origin> origins = new List<Origin>();
                while (reader.Read())
                {
                    origins.Add(new Origin()
                    {
                        Id = reader.GetInt32(reader.GetOrdinal("Id")),
                        OriginName = reader.GetString(reader.GetOrdinal("originName"))
                    });
                }
                reader.Close();
                return origins;
            }
        }
    }
}
