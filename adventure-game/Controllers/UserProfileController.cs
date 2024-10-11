using Microsoft.AspNetCore.Mvc;
using adventure_game.Models;
using adventure_game.Repositories;

namespace adventure_game.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserProfileController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        // GET: api/userprofile
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_userRepository.GetAll());
        }

        // GET: api/userprofile/{id}
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var profile = _userRepository.GetById(id);
            if (profile == null)
            {
                return NotFound();
            }
            return Ok(profile);
        }

        // GET: api/userprofile/getbyemail?email={email}
        [HttpGet("getbyemail")]
        public IActionResult GetByEmail(string email)
        {
            var user = _userRepository.GetByEmail(email);

            if (string.IsNullOrEmpty(email) || user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        // POST: api/userprofile/login (no password needed)
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest loginRequest)
        {
            var user = _userRepository.GetByEmail(loginRequest.Email);

            // Check if the user exists
            if (user == null)
            {
                return Unauthorized(); // Return 401 Unauthorized if the user doesn't exist
            }

            // Successful login (no password required)
            return Ok(user);
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] User user)
        {
            // Automatically set the user to be a non-admin and default userTypeId
            user.IsAdmin = false; // All new users will be non-admin
            user.UserTypeId = 0;  // Default value for userTypeId

            // Add user to the repository
            _userRepository.Add(user);

            return CreatedAtAction(nameof(GetByEmail), new { email = user.Email }, user);
        }



        // PUT: api/userprofile/{id}
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] User user)
        {
            if (id != user.Id) return BadRequest();

            // Update user in the repository
            _userRepository.Update(user);
            return NoContent();
        }
    }

    // DTO for login requests (no password field needed)
    public class LoginRequest
    {
        public string Email { get; set; }
    }
}
