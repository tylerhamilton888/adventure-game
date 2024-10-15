using adventure_game.Models;
using System.Collections.Generic;

namespace adventure_game.Repositories
{
    public interface IInventoryRepository
    {
        bool AddItemToInventory(int characterId, int itemId); 
        bool EquipItem(int characterId, int itemId);
        bool UnequipItem(int characterId, int itemId);
        bool RemoveItemFromInventory(int characterId, int itemId);
        List<Item> GetInventoryByCharacterId(int characterId);
        List<Item> GetEquippedItemsByCharacterId(int characterId);
        List<Item> GetUnequippedItemsByCharacterId(int characterId);
    }
}