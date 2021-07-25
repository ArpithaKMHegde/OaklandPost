using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using adv_web_dev.Interfaces;
using adv_web_dev.Models;
using adv_web_dev.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace adv_web_dev.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestController : ControllerBase
    {
        private readonly ILogger<TestController> _logger;
        private readonly ITestService _testService;

        public TestController(ILogger<TestController> logger, ITestService testService)
        {
            _logger = logger;
            _testService = testService;
        }

        [HttpGet]
        [Route("get")]
        public async Task<IActionResult> Get()
        {
            return Ok(await _testService.GetTestData());
        }
    }
}
