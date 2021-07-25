using System;
using System.Collections.Generic;

namespace adv_web_dev.Models
{
    public class UserAdUpload
    {
        public DateTime SubmittedDate { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public string Location { get; set; }

        public List<Guid> FileIds { get; set; }

        public Guid InsertId { get; set; }
    }
}