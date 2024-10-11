using adventure_game.Models;
using System.Collections.Generic;

namespace adventure_game.Repositories
{
    public interface IInventoryRepository
    {
        List<InventoryItem> GetInventoryByCharacterId(int characterId);
    }
}
