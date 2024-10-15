using adventure_game.Models;
using adventure_game.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace adventure_game.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly IItemsRepository _itemsRepository;
        private readonly IInventoryRepository _inventoryRepository;

        public ItemsController(IItemsRepository itemsRepository, IInventoryRepository inventoryRepository)
        {
            _itemsRepository = itemsRepository;
            _inventoryRepository = inventoryRepository;
        }

        // GET: api/items
        [HttpGet]
        public IActionResult GetAllItems()
        {
            var items = _itemsRepository.GetAllItems();
            return Ok(items);
        }

        // GET: api/items/{itemId}
        [HttpGet("{itemId}")]
        public IActionResult GetItemById(int itemId)
        {
            var items = _itemsRepository.GetItemsByIds(new List<int> { itemId });
            if (items == null || items.Count == 0)
            {
                return NotFound();
            }
            return Ok(items[0]);
        }

        // POST: api/items/assign
        [HttpPost("assign")]
        public IActionResult AssignItemToInventory([FromBody] AssignItemRequest request)
        {
            if (request.CharacterId <= 0 || request.ItemId <= 0)
            {
                return BadRequest("Character ID and Item ID must be provided.");
            }

            bool added = _inventoryRepository.AddItemToInventory(request.CharacterId, request.ItemId);
            if (added)
            {
                return Ok(new { success = true, message = "Item assigned to character inventory successfully." });
            }
            return BadRequest(new { success = false, message = "Failed to assign item to character inventory." });
        }

        // GET: api/items/bulk?ids=1,2,3
        [HttpGet("bulk")]
        public IActionResult GetItemsByIds([FromQuery] string ids)
        {
            if (string.IsNullOrEmpty(ids))
            {
                return BadRequest("Item IDs must be provided.");
            }

            var itemIds = new List<int>();
            foreach (var id in ids.Split(','))
            {
                if (int.TryParse(id, out int itemId))
                {
                    itemIds.Add(itemId);
                }
            }

            var items = _itemsRepository.GetItemsByIds(itemIds);
            return Ok(items);
        }
    }

    // Request DTO for assigning items to inventory
    public class AssignItemRequest
    {
        public int CharacterId { get; set; }
        public int ItemId { get; set; }
    }
}
