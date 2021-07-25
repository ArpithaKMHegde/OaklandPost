using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using adv_web_dev.Models;
using adv_web_dev.Data.Entities;

namespace adv_web_dev.Data
{
    public class WebDevDbContext : DbContext
    {
        public DbConnection Connection
        {
            get
            {
                return this.Database.GetDbConnection();
            }
        }

        public WebDevDbContext(DbContextOptions<WebDevDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }
    }
}