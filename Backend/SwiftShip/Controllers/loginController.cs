using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SwiftShip.Models;
using SwiftShip.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Text;

namespace SwiftShip.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class loginController : ControllerBase
    {
        private IConfiguration _config;
        private readonly Icourierservice _courierservice;
        public loginController(IConfiguration configuration, Icourierservice c)
        {
            _courierservice= c;
            _config = configuration;

        }
        private users Authenticateuser(users user)
        {
            Console.WriteLine(user.username + " " + user.password); 
            if (user.username == "admin" && user.password == "12345")
            {
                user = new users { username = "elveena" };

            }
            return user;
        }
        private string GenerateToken(users users)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(_config["Jwt:Issuer"], _config["Jwt:Audience"], null, expires: DateTime.Now.AddMinutes(1), signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login(users users)
        {
            IActionResult response = Unauthorized();
            var user_= Authenticateuser(users);
            if (user_!=null)
            {
                var token=GenerateToken(user_);
                response = Ok(new { token = token });
            }
            return response;
        }


        [HttpPost]
        [Route("/users/loginuser")]
        public async Task<IActionResult> validateuser ([FromBody] userlogin userInfo)
        {


            userlogin validuser = await _courierservice.validate(userInfo.userId,userInfo.username, userInfo.password); 
            admin   adminuser = await _courierservice.validateAdmin(userInfo.username, userInfo.password);
            if (validuser == null && adminuser ==null) {

                return Ok(new { message = "invalid" });
            }
           else  if(validuser != null)
            {
                return Ok(new { message = "user", userId = validuser.userId });
            }
            else
            {
                return Ok(new { message = "admin" });
            }
        }
    }
}
