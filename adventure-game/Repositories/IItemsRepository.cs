using adventure_game.Models;
using System.Collections.Generic;

namespace adventure_game.Repositories
{
    public interface IItemsRepository
    {
        List<Item> GetAllItems();
        List<Item> GetItemsByIds(List<int> ids); 
    }
}
