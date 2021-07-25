using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using adv_web_dev.Data;
using adv_web_dev.Models;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace adv_web_dev.Extensions
{
    public static class StringExtensions
    {
        public static string EnsureTrailingSlash(this string str)
        {
            return str.TrimEnd('/') + "/";
        }
    }
}