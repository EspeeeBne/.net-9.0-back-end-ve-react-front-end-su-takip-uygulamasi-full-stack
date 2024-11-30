using Microsoft.AspNetCore.Mvc;
using WaterTrackingApp.Models;
using WaterTrackingApp.Services;

namespace WaterTrackingApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] User user)
        {
            var result = _authService.Register(user);
            if (!result)
            {
                return BadRequest("User registration failed.");
            }
            return Ok("User registered successfully.");
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] UserLoginRequest loginRequest)
        {
            var user = _authService.Login(loginRequest);
            if (user == null)
            {
                return Unauthorized("Invalid username or password.");
            }
            return Ok(new { userId = user.UserId, username = user.Username });
        }
    }
}
