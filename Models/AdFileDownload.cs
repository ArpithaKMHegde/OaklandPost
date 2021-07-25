using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace adv_web_dev.Models
{
    public class AdFileDownload
    {
        public FileStream Stream { get; set; }
        public string FileName { get; set; }
    }
}