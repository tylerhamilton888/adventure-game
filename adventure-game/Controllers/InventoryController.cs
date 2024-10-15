using adventure_game.Models;
using adventure_game.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace adventure_game.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryController : ControllerBase
    {
        private readonly IInventoryRepository _inventoryRepository;

        public InventoryController(IInventoryRepository inventoryRepository)
        {
            _inventoryRepository = inventoryRepository;
        }

        // POST: api/inventory/add
        [HttpPost("add")]
        public IActionResult AddItemToInventory(AddItemRequest request)
        {
            _inventoryRepository.AddItemToInventory(request.CharacterId, request.ItemId);
            return Ok("Item added successfully.");
        }

        // POST: api/inventory/equip
        [HttpPost("equip")]
        public IActionResult EquipItem(EquipRequest request)
        {
            var success = _inventoryRepository.EquipItem(request.CharacterId, request.ItemId);
            if (success)
            {
                return Ok("Item equipped successfully.");
            }
            else
            {
                return StatusCode(500, "Failed to equip item.");
            }
        }

        // POST: api/inventory/unequip
        [HttpPost("unequip")]
        public IActionResult UnequipItem(EquipRequest request)
        {
            var success = _inventoryRepository.UnequipItem(request.CharacterId, request.ItemId);
            if (success)
            {
                return Ok("Item unequipped successfully.");
            }
            else
            {
                return StatusCode(500, "Failed to unequip item.");
            }
        }

        // DELETE: api/inventory/remove
        [HttpDelete("remove")]
        public IActionResult RemoveItemFromInventory(RemoveItemRequest request)
        {
            var success = _inventoryRepository.RemoveItemFromInventory(request.CharacterId, request.ItemId);
            if (success)
            {
                return Ok("Item removed successfully.");
            }
            else
            {
                return StatusCode(500, "Failed to remove item from inventory.");
            }
        }
    }

    public class AddItemRequest
    {
        public int CharacterId { get; set; }
        public int ItemId { get; set; }
    }

    public class EquipRequest
    {
        public int CharacterId { get; set; }
        public int ItemId { get; set; }
    }

    public class RemoveItemRequest
    {
        public int CharacterId { get; set; }
        public int ItemId { get; set; }
    }
}