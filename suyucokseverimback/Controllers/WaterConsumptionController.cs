using Microsoft.AspNetCore.Mvc;
using WaterTrackingApp.Models;
using WaterTrackingApp.Services;

namespace WaterTrackingApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WaterConsumptionController : ControllerBase
    {
        private readonly WaterConsumptionService _waterConsumptionService;

        public WaterConsumptionController(WaterConsumptionService waterConsumptionService)
        {
            _waterConsumptionService = waterConsumptionService;
        }

        [HttpPost("add")]
        public IActionResult AddWaterConsumption([FromBody] WaterConsumption waterConsumption)
        {
            var result = _waterConsumptionService.AddWaterConsumption(waterConsumption);
            if (!result)
            {
                return BadRequest("Failed to add water consumption entry.");
            }
            var todayConsumption = _waterConsumptionService.GetTodayConsumption(waterConsumption.UserId);
            return Ok(new { message = "Water consumption added successfully.", todayConsumption });
        }

        [HttpGet("daily/{userId}")]
        public IActionResult GetDailyConsumption(string userId)
        {
            var dailyData = _waterConsumptionService.GetDailyConsumption(userId);
            if (dailyData == null)
            {
                return NotFound("No data found for the specified user.");
            }
            return Ok(dailyData);
        }

        [HttpGet("weekly/{userId}")]
        public IActionResult GetWeeklyConsumption(string userId)
        {
            var weeklyData = _waterConsumptionService.GetWeeklyConsumption(userId);
            if (weeklyData == null)
            {
                return NotFound("No data found for the specified user.");
            }
            return Ok(weeklyData);
        }

        [HttpGet("monthly/{userId}")]
        public IActionResult GetMonthlyConsumption(string userId)
        {
            var monthlyData = _waterConsumptionService.GetMonthlyConsumption(userId);
            if (monthlyData == null)
            {
                return NotFound("No data found for the specified user.");
            }
            return Ok(monthlyData);
        }

        [HttpGet("yearly/{userId}")]
        public IActionResult GetYearlyConsumption(string userId)
        {
            var yearlyData = _waterConsumptionService.GetYearlyConsumption(userId);
            if (yearlyData == null)
            {
                return NotFound("No data found for the specified user.");
            }
            return Ok(yearlyData);
        }
    }
}
