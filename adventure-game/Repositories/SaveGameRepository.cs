using adventure_game.Repositories;
using adventure_game.Models;
using Microsoft.Data.SqlClient;

public class SaveGameRepository : BaseRepository, ISaveGameRepository
{
    public SaveGameRepository(IConfiguration configuration) : base(configuration) { }

    public bool SaveGame(SaveGame saveGame)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                    INSERT INTO SaveGames (saveGameName, userId, characterId, onLevel)
                    VALUES (@saveGameName, @userId, @characterId, @onLevel)";

                cmd.Parameters.AddWithValue("@saveGameName", saveGame.SaveGameName);
                cmd.Parameters.AddWithValue("@userId", saveGame.UserId);
                cmd.Parameters.AddWithValue("@characterId", saveGame.CharacterId);
                cmd.Parameters.AddWithValue("@onLevel", saveGame.OnLevel);

                int rowsAffected = cmd.ExecuteNonQuery();
                return rowsAffected > 0;
            }
        }
    }

    public List<SaveGame> GetSavedGamesByUser(int userId)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = "SELECT Id, saveGameName, userId, characterId, onLevel FROM SaveGames WHERE userId = @userId";
                cmd.Parameters.AddWithValue("@userId", userId);
                var reader = cmd.ExecuteReader();
                List<SaveGame> saveGames = new List<SaveGame>();
                while (reader.Read())
                {
                    saveGames.Add(new SaveGame()
                    {
                        Id = reader.GetInt32(reader.GetOrdinal("Id")),
                        SaveGameName = reader.GetString(reader.GetOrdinal("saveGameName")),
                        UserId = reader.GetInt32(reader.GetOrdinal("userId")),
                        CharacterId = reader.GetInt32(reader.GetOrdinal("characterId")),
                        OnLevel = reader.GetInt32(reader.GetOrdinal("onLevel"))
                    });
                }
                reader.Close();
                return saveGames;
            }
        }
    }

    public void UpdateSaveGame(SaveGame saveGame)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                    UPDATE SaveGames
                    SET saveGameName = @saveGameName, characterId = @characterId, onLevel = @onLevel
                    WHERE userId = @userId AND Id = @saveGameId";

                cmd.Parameters.AddWithValue("@saveGameName", saveGame.SaveGameName);
                cmd.Parameters.AddWithValue("@characterId", saveGame.CharacterId);
                cmd.Parameters.AddWithValue("@onLevel", saveGame.OnLevel);
                cmd.Parameters.AddWithValue("@userId", saveGame.UserId);
                cmd.Parameters.AddWithValue("@saveGameId", saveGame.Id);

                cmd.ExecuteNonQuery();
            }
        }
    }

    public SaveGame GetSaveGameById(int saveGameId)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = "SELECT Id, saveGameName, userId, characterId, onLevel FROM SaveGames WHERE Id = @saveGameId";
                cmd.Parameters.AddWithValue("@saveGameId", saveGameId);
                var reader = cmd.ExecuteReader();
                if (reader.Read())
                {
                    return new SaveGame()
                    {
                        Id = reader.GetInt32(reader.GetOrdinal("Id")),
                        SaveGameName = reader.GetString(reader.GetOrdinal("saveGameName")),
                        UserId = reader.GetInt32(reader.GetOrdinal("userId")),
                        CharacterId = reader.GetInt32(reader.GetOrdinal("characterId")),
                        OnLevel = reader.GetInt32(reader.GetOrdinal("onLevel"))
                    };
                }
                reader.Close();
                return null;
            }
        }
    }
}