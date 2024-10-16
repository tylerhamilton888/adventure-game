﻿using adventure_game.Models;
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

        // POST: api/inventory/add
        [HttpPost("add")]
        public IActionResult AddItemToInventory([FromBody] EquipRequest request)
        {
            var result = _inventoryRepository.AddItemToInventory(request.CharacterId, request.ItemId);
            if (result)
            {
                return Ok(new { success = true, message = $"Item {request.ItemId} added to inventory." });
            }
            return BadRequest(new { success = false, message = "Failed to add item to inventory." });
        }

        // DELETE: api/inventory/{characterId}/item/{itemId}
        [HttpDelete("{characterId}/item/{itemId}")]
        public IActionResult DeleteItemFromInventory(int characterId, int itemId)
        {
            var itemExists = _inventoryRepository.GetInventoryItem(characterId, itemId);
            if (itemExists == null)
            {
                return NotFound(new { message = "Item not found in inventory" });
            }

            _inventoryRepository.DeleteInventoryItem(characterId, itemId);
            return Ok(new { message = "Item deleted successfully" });
        }
    }

    // Simple DTO for the equip/unequip request body
    public class EquipRequest
    {
        public int CharacterId { get; set; }
        public int ItemId { get; set; }
    }
}
