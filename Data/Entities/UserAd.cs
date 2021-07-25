using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace adv_web_dev.Data.Entities
{
    [Table("UserAds")]
    public class UserAd
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        public DateTime SubmittedDate { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [Required]
        public string Location { get; set; }

        public List<AdFileUpload> Files { get; set; }
        public ReviewedAd ReviewedAd { get; set; }
    }
}
