using adventure_game.Models;
using System.Collections.Generic;

public interface IInventoryRepository
{
    InventoryItem GetInventoryItem(int characterId, int itemId);
    void DeleteInventoryItem(int characterId, int itemId);
    List<InventoryItem> GetInventoryByCharacterId(int characterId);
    bool EquipItem(int characterId, int itemId);
    bool UnequipItem(int characterId, int itemId);
    bool AddItemToInventory(int characterId, int itemId);
}
