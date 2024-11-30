using System.Collections.Generic;
using System.IO;
using Newtonsoft.Json;
using WaterTrackingApp.Models;

namespace WaterTrackingApp.Data
{
    public class JsonDatabase
    {
        private readonly string _userFilePath = "Data/User.json";
        private readonly string _waterConsumptionFilePath = "Data/WaterConsumption.json";

        public JsonDatabase()
        {
            if (!File.Exists(_userFilePath))
            {
                File.WriteAllText(_userFilePath, "[]");
            }
            if (!File.Exists(_waterConsumptionFilePath))
            {
                File.WriteAllText(_waterConsumptionFilePath, "[]");
            }
        }

        public List<User> GetUsers()
        {
            var jsonData = File.ReadAllText(_userFilePath);
            return JsonConvert.DeserializeObject<List<User>>(jsonData) ?? new List<User>();
        }

        public void SaveUsers(List<User> users)
        {
            var jsonData = JsonConvert.SerializeObject(users, Formatting.Indented);
            File.WriteAllText(_userFilePath, jsonData);
        }

        public List<WaterConsumption> GetWaterConsumptions()
        {
            var jsonData = File.ReadAllText(_waterConsumptionFilePath);
            return JsonConvert.DeserializeObject<List<WaterConsumption>>(jsonData) ?? new List<WaterConsumption>();
        }

        public void SaveWaterConsumptions(List<WaterConsumption> waterConsumptions)
        {
            var jsonData = JsonConvert.SerializeObject(waterConsumptions, Formatting.Indented);
            File.WriteAllText(_waterConsumptionFilePath, jsonData);
        }
    }
}
