using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace adv_web_dev.Data.Entities
{
    [Table("ReviewedAds")]
    public class ReviewedAd
    {
        [Key]
        public Guid Id { get; set; }

        public UserAd UserAd { get; set; }

        [JsonIgnore]
        public Guid UserAdId { get; set; }

        public DateTime ReviewedDate { get; set; }

        public string Comments { get; set; }

        public bool Approved { get; set; }

        public bool Rejected { get; set; }
    }
}
