using adventure_game.Models;
using System.Collections.Generic;

public interface IInventoryRepository
{
    InventoryItem GetInventoryItem(int inventoryItemId); 
    void DeleteInventoryItem(int inventoryItemId); 
    List<InventoryItem> GetInventoryByCharacterId(int characterId);
    bool EquipItem(int inventoryItemId); 
    bool UnequipItem(int inventoryItemId); 
    bool AddItemToInventory(int characterId, int itemId);
}
