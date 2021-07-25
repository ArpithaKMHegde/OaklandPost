using System;

namespace adv_web_dev.Data.Entities
{
    public class ScheduledInsert
    {
        public Guid UserAdId { get; set; }
        public bool Running { get; set; }
        public bool Completed { get; set; }
    }
}