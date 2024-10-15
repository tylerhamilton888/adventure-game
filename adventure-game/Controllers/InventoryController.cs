using adventure_game.Repositories;
using Microsoft.AspNetCore.Mvc;
using adventure_game.Models;

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
        public IActionResult GetInventoryForCharacter(int characterId)
        {
            var inventoryItems = _inventoryRepository.GetInventoryByCharacterId(characterId);
            if (inventoryItems == null || inventoryItems.Count == 0)
            {
                return NotFound();
            }
            return Ok(inventoryItems);
        }

        // POST: api/inventory/equip
        [HttpPost("equip")]
        public IActionResult EquipItem([FromBody] EquipRequest request)
        {
            var result = _inventoryRepository.EquipItem(request.CharacterId, request.ItemId);
            if (result)
            {
                return Ok(new { success = true, message = $"You have equipped {request.ItemId}." });
            }
            else
            {
                return BadRequest(new { success = false, message = "You already have both hands full!" });
            }
        }

        // POST: api/inventory/unequip
        [HttpPost("unequip")]
        public IActionResult UnequipItem([FromBody] EquipRequest request)
        {
            var result = _inventoryRepository.UnequipItem(request.CharacterId, request.ItemId);

            if (result)
            {
                return Ok(new { success = true, message = $"You have unequipped {request.ItemId}." });
            }
            return BadRequest(new { success = false, message = "Failed to unequip item." });
        }
    }

    // Simple DTO for the equip/unequip request body
    public class EquipRequest
    {
        public int CharacterId { get; set; }
        public int ItemId { get; set; }
    }
}