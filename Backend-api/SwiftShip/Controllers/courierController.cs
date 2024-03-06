using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;

using SwiftShip.Services;
using SwiftShip.Models;
using System.Data.SqlClient;
using SwiftShip.Repository;
namespace SwiftShip.Controllers
{
    [ApiController]
    public class courierController : Controller
    {
        private readonly courierservice _courierService;

        public courierController(courierservice courierservice)
        {
            _courierService = courierservice;
        }
        [HttpGet]
        [Route("api/couriers")]

        public ActionResult<List<couriers>> getCourierDetails()
        {
            List<couriers> courierList = _courierService.getCourierDetails();
            return Ok(courierList);
        }

        [HttpPost]
        [Route("api/addcouriers")]

        public ActionResult addCourierDetails([FromBody] addcourier courierInfo)
        {

            if (1 == _courierService.addCourierDetails(courierInfo))
                return Ok();
            else
                return BadRequest();
        }

        [HttpGet]
        [Route("api/couriers/{courierId}")]
        public ActionResult getCourierDetails(int courierId)
        {
            couriers courier = _courierService.getCourierDetails(courierId);

            if (courier == null)
            {
                // Handle case when courier details are not found
                return NotFound();
            }

            return Ok(courier);
        }

        [HttpGet]
        [Route("api/couriers/price/{courierId}")]
        public IActionResult getPrice(int courierId)
        {
            int courierprice = _courierService.getPrice(courierId);

            if (courierprice == null || courierprice == 0)
            {
                // Handle case when courier details are not found
                return Ok(new { message = "invalid!!! " });
            }

            return Ok(new { message = courierprice });
        }
    }
}
