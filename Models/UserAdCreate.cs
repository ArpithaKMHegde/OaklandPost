using System;
using adv_web_dev.Data.Entities;

namespace adv_web_dev.Models
{
    public class UserAdCreate
    {
        public UserAd UserAd { get; set; }
        public Guid InsertId { get; set; }
        public Guid UserInsertId { get; set; }
    }
}