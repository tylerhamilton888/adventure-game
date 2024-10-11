using adventure_game.Models;
using adventure_game.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace adventure_game.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CharactersController : ControllerBase
    {
        private readonly ICharactersRepository _charactersRepository;

        public CharactersController(ICharactersRepository charactersRepository)
        {
            _charactersRepository = charactersRepository;
        }

        // GET: api/characters/generic
        [HttpGet("generic")]
        public IActionResult GetGenericCharacters()
        {
            var characters = _charactersRepository.GetGenericCharacters();
            return Ok(characters);
        }

        // GET: api/characters/user/{userId}
        [HttpGet("user/{userId}")]
        public IActionResult GetCharactersByUserId(int userId)
        {
            var characters = _charactersRepository.GetCharactersByUserId(userId);
            return Ok(characters);
        }

        // POST: api/characters
        [HttpPost]
        public IActionResult AddCharacter(Character character)
        {
            if (character.UserId == null || character.UserId <= 0)
            {
                return BadRequest("User ID is required to create a character.");
            }

            _charactersRepository.AddCharacter(character);
            return CreatedAtAction(nameof(GetCharactersByUserId), new { userId = character.UserId }, character);
        }

        // GET: api/characters/user/{userId}/all
        [HttpGet("user/{userId}/all")]
        public IActionResult GetAllCharactersForUser(int userId)
        {
            var characters = _charactersRepository.GetAllCharactersForUser(userId);
            return Ok(characters);
        }
    }
}
