using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace adv_web_dev.Models
{
    public class TestModel
    {
        public Guid Id {get;set;}
        public string Name {get;set;}
    }
}