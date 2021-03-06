using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace adv_web_dev.Data.Entities
{
    [Table("User")]
    public class User
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public string IsAdmin { get; set; }
    }
}
