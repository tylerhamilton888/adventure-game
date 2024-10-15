﻿namespace adventure_game.Models
{
    public class InventoryItem
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string TypeName { get; set; }
        public int StrengthModifier { get; set; }
        public int DexterityModifier { get; set; }
        public int CharismaModifier { get; set; }
        public int ToughnessModifier { get; set; }
        public bool Equippable { get; set; }
        public bool IsTwoHanded { get; set; }
        public bool Equipped { get; set; } 
    }
}
