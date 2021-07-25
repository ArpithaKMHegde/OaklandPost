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
    [Table("UserFileUploads")]
    public class UserFileUpload
    {
        [Required]
        public Guid Id { get; set; }

        [JsonIgnore]
        public string StorageFileName { get; set; }

        public string OriginalFileName { get; set; }
    }
}