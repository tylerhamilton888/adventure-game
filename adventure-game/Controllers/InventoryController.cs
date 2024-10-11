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
    }
}
