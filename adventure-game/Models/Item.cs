namespace adventure_game.Models
{
    public class Item
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Type { get; set; } 
        public int StrengthModifier { get; set; }
        public int DexterityModifier { get; set; }
        public int CharismaModifier { get; set; }
        public int ToughnessModifier { get; set; }
        public bool Equippable { get; set; }
        public bool IsTwoHanded { get; set; }
    }
}
