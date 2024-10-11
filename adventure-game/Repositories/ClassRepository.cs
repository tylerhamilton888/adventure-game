using adventure_game.Repositories;
using System.Security.Claims;
using adventure_game.Models;

public class ClassRepository : BaseRepository, IClassRepository
{
    public ClassRepository(IConfiguration configuration) : base(configuration) { }

    public List<Class> GetAllClasses()
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = "SELECT Id, className FROM Classes";
                var reader = cmd.ExecuteReader();
                List<Class> classes = new List<Class>();
                while (reader.Read())
                {
                    classes.Add(new Class()
                    {
                        Id = reader.GetInt32(reader.GetOrdinal("Id")),
                        ClassName = reader.GetString(reader.GetOrdinal("className"))
                    });
                }
                reader.Close();
                return classes;
            }
        }
    }
}
