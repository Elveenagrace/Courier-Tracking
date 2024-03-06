using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;

using SwiftShip.Services;
using SwiftShip.Models;
using System.Data.SqlClient;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authorization;

namespace SwiftShip.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class userController : Controller
    {
        private readonly courierservice _courierService;

        public userController(courierservice courierservice)
        {
            _courierService = courierservice;
        }
       

        
        [HttpGet]
        [Route("Details/{id}")]
        public ActionResult getUserDetails(int id)
        {
            users user = _courierService.getUserDetails(id);

            if (user == null)
            {
                // Handle case when courier details are not found
                return NotFound();
            }

            return Ok(user);
        }
        [HttpGet]
        [Route("Details")]
        public ActionResult<List<users>> getAllUserDetails()
        {
            List<users> userList = _courierService.getAllUserDetails();
            return Ok(userList);
        }


        [HttpPost]
        [Route("/users/signup")]
        public ActionResult<string> addUserDetails([FromBody] users userInfo)
        {

            if (1 == _courierService.addUserDetails(userInfo))
                return Ok("success");
            else
                return BadRequest("failure");
        }

        [HttpPut("{userId}")]
        public async Task<IActionResult> updateUserDetails(int userId, [FromBody] users userInfo)
        {
            var updatedUser = await _courierService.updateUserDetails(userId, userInfo);
            if (updatedUser != null)
            {
                return Ok(updatedUser);
            }
            else
            {
                return NotFound("User not found.");
            }
        }





    }
}
