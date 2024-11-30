using System;

namespace WaterTrackingApp.Models
{
    public class WaterConsumption
    {
        public string UserId { get; set; }
        public DateTime Date { get; set; }
        public double Amount { get; set; }
    }
}
