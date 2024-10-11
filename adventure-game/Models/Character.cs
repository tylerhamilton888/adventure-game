namespace adventure_game.Models
{
    public class Character
    {
        public int Id { get; set; }
        public int? UserId { get; set; }  
        public string Name { get; set; }

        
        public int ClassId { get; set; }
        public int OriginId { get; set; }

      
        public int Health { get; set; } = 20;
        public int Strength { get; set; } = 5;
        public int Dexterity { get; set; } = 5;
        public int Charisma { get; set; } = 5;
        public int WeaponSkill { get; set; } = 5;
        public int Toughness { get; set; } = 5;
        public int Money { get; set; } = 5;
        public bool IsDefault { get; set; }

        
        public string ClassName { get; set; } 
        public string OriginName { get; set; } 
    }
}
