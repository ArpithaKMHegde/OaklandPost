using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using adv_web_dev.Data;
using adv_web_dev.Models;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using adv_web_dev.Interfaces;

namespace adv_web_dev.Services
{
    public class TestService : ITestService
    {
        private readonly WebDevDbContext _context;

        public TestService(WebDevDbContext context)
        {
            _context = context;
        }

        public async Task<List<TestModel>> GetTestData()
        {
            var query = await _context.Connection.QueryAsync<TestModel>(@"
                SELECT * FROM Test
            ");

            return query.ToList();
        }
    }
}