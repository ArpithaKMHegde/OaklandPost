using System;

namespace adv_web_dev.Models
{
    public class UserRegistrationModel
    {
        public Guid id { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public bool isAdmin { get; set; }
    }
}
