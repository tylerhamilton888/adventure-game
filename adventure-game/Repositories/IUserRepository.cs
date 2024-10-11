using adventure_game.Models;
using System.Collections.Generic;

namespace adventure_game.Repositories
{
    public interface IUserRepository
    {
        List<User> GetAll(); 
        User GetById(int id); 
        User GetByEmail(string email); 
        void Add(User userProfile); 
        void Update(User userProfile);
    }
}
