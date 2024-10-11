namespace adventure_game.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Username { get; set; } // Matches the "username" column in your table
        public bool IsAdmin { get; set; } // This will map to the 'isAdmin' bit column
        public int UserTypeId { get; set; } // Default to 0 for standard users
    }
}
