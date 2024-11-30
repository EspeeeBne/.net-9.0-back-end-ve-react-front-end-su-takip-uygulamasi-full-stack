using System;
using System.Collections.Generic;
using System.Linq;
using WaterTrackingApp.Models;
using WaterTrackingApp.Data;

namespace WaterTrackingApp.Services
{
    public class WaterConsumptionService
    {
        private readonly JsonDatabase _jsonDatabase;

        public WaterConsumptionService(JsonDatabase jsonDatabase)
        {
            _jsonDatabase = jsonDatabase;
        }

        public bool AddWaterConsumption(WaterConsumption newConsumption)
        {
            if (string.IsNullOrEmpty(newConsumption.UserId))
            {
                throw new ArgumentException("UserId is required for adding water consumption");
            }

            var consumptions = _jsonDatabase.GetWaterConsumptions();
            newConsumption.Date = DateTime.UtcNow;
            consumptions.Add(newConsumption);
            _jsonDatabase.SaveWaterConsumptions(consumptions);
            return true;
        }

        public List<WaterConsumption> GetDailyConsumption(string userId)
        {
            var consumptions = _jsonDatabase.GetWaterConsumptions();
            var startDate = DateTime.UtcNow.Date;
            return consumptions.Where(c => c.UserId == userId && c.Date >= startDate).ToList();
        }

        public double GetTodayConsumption(string userId)
        {
            var consumptions = GetDailyConsumption(userId);
            return consumptions.Sum(c => c.Amount);
        }

        public List<WaterConsumption> GetWeeklyConsumption(string userId)
        {
            var consumptions = _jsonDatabase.GetWaterConsumptions();
            var startDate = DateTime.UtcNow.AddDays(-7);
            return consumptions.Where(c => c.UserId == userId && c.Date >= startDate).ToList();
        }

        public List<WaterConsumption> GetMonthlyConsumption(string userId)
        {
            var consumptions = _jsonDatabase.GetWaterConsumptions();
            var startDate = DateTime.UtcNow.AddMonths(-1);
            return consumptions.Where(c => c.UserId == userId && c.Date >= startDate).ToList();
        }

        public List<WaterConsumption> GetYearlyConsumption(string userId)
        {
            var consumptions = _jsonDatabase.GetWaterConsumptions();
            var startDate = DateTime.UtcNow.AddYears(-1);
            return consumptions.Where(c => c.UserId == userId && c.Date >= startDate).ToList();
        }
    }
}
