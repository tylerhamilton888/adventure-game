using adventure_game.Models;
using System.Collections.Generic;

namespace adventure_game.Repositories
{
    public interface ICharactersRepository
    {
        List<Character> GetGenericCharacters();
        List<Character> GetCharactersByUserId(int userId);
        void AddCharacter(Character character);
        List<Character> GetAllCharactersForUser(int userId);
    }
}
