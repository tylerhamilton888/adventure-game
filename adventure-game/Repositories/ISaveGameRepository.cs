using adventure_game.Models;

public interface ISaveGameRepository
{
    bool SaveGame(SaveGame saveGame); 
    List<SaveGame> GetSavedGamesByUser(int userId);
    SaveGame GetSaveGameById(int saveGameId);
    void UpdateSaveGame(SaveGame saveGame);
}