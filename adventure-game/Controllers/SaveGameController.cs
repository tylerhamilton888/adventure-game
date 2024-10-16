using Microsoft.AspNetCore.Mvc;
using adventure_game.Models;
using adventure_game.Repositories;

namespace adventure_game.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SaveGameController : ControllerBase
    {
        private readonly ISaveGameRepository _saveGameRepository;

        public SaveGameController(ISaveGameRepository saveGameRepository)
        {
            _saveGameRepository = saveGameRepository;
        }

        [HttpPost]
        public IActionResult SaveGame([FromBody] SaveGame saveGame)
        {
            if (saveGame == null)
            {
                return BadRequest(new { success = false, message = "Invalid save data." });
            }

            var success = _saveGameRepository.SaveGame(saveGame);
            if (success)
            {
                return Ok(new { success = true });
            }
            return BadRequest(new { success = false, message = "Failed to save game progress." });
        }

        [HttpGet("user/{userId}")]
        public IActionResult GetSavedGamesByUser(int userId)
        {
            var savedGames = _saveGameRepository.GetSavedGamesByUser(userId);
            if (savedGames == null || savedGames.Count == 0)
            {
                return NotFound("No saved games found.");
            }
            return Ok(savedGames);
        }
    }
}