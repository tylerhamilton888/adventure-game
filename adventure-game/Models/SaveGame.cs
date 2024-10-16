namespace adventure_game.Models
{
    public class SaveGame
    {
        public int Id { get; set; }
        public string SaveGameName { get; set; }
        public int UserId { get; set; }
        public int CharacterId { get; set; }
        public int OnLevel { get; set; }
    }
}
