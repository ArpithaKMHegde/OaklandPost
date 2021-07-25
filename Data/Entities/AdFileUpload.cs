using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace adv_web_dev.Data.Entities
{
    [Table("AdFileUploads")]
    public class AdFileUpload
    {
        [Required]
        public Guid Id { get; set; }

        public UserFileUpload UserFileUpload { get; set; }

        [JsonIgnore]
        public Guid UserFileUploadId { get; set; }

        public UserAd UserAd { get; set; }

        [JsonIgnore]
        public Guid UserAdId { get; set; }

    }
}