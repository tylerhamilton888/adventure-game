using adventure_game.Models;
using adventure_game.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

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

        // GET: api/inventory/character/{characterId}
        [HttpGet("character/{characterId}")]
        public IActionResult GetInventoryByCharacterId(int characterId)
        {
            var inventory = _inventoryRepository.GetInventoryByCharacterId(characterId);
            if (inventory == null || inventory.Count == 0)
            {
                return NotFound(new { message = "No inventory found for the character." });
            }
            return Ok(inventory);
        }

        // POST: api/inventory/equip
        [HttpPost("equip")]
        public IActionResult EquipItem([FromBody] EquipItemRequest request)
        {
            if (request.CharacterId <= 0 || request.ItemId <= 0)
            {
                return BadRequest("Character ID and Item ID must be provided.");
            }

            bool equipped = _inventoryRepository.EquipItem(request.CharacterId, request.ItemId);
            if (equipped)
            {
                return Ok(new { success = true, message = "Item equipped successfully." });
            }
            return BadRequest(new { success = false, message = "Failed to equip item." });
        }
    }

    // Request DTO for equipping items
    public class EquipItemRequest
    {
        public int CharacterId { get; set; }
        public int ItemId { get; set; }
    }
}