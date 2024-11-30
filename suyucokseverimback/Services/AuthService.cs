using System.Collections.Generic;
using System.Linq;
using WaterTrackingApp.Models;
using WaterTrackingApp.Data;

namespace WaterTrackingApp.Services
{
    public class AuthService
    {
        private readonly JsonDatabase _jsonDatabase;

        public AuthService(JsonDatabase jsonDatabase)
        {
            _jsonDatabase = jsonDatabase;
        }

        public bool Register(User newUser)
        {
            var users = _jsonDatabase.GetUsers();
            if (users.Any(u => u.Username == newUser.Username))
            {
                return false;
            }

            newUser.UserId = System.Guid.NewGuid().ToString();
            users.Add(newUser);
            _jsonDatabase.SaveUsers(users);
            return true;
        }

        public User Login(UserLoginRequest loginRequest)
        {
            var users = _jsonDatabase.GetUsers();
            return users.FirstOrDefault(u => u.Username == loginRequest.Username && u.Password == loginRequest.Password);
        }
    }

    public class UserLoginRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
