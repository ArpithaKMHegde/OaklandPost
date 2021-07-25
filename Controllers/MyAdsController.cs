using System;
using adv_web_dev.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace adv_web_dev.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MyAdsController : ControllerBase
    {
        private readonly ILogger<MyAdsController> _logger;
        private readonly IMyAdsService _myadsService;

        public MyAdsController(ILogger<MyAdsController> logger, IMyAdsService myadsService)
        {
            _logger = logger;
            _myadsService = myadsService;
        }

        [HttpGet]
        [Route("getAvailableInserts/{userId}")]
        public IActionResult GetAvailableInserts(Guid userId)
        {
            return Ok(_myadsService.GetAvailableInserts(userId));
        }

        [HttpGet]
        [Route("getAdsToBeReviewed/{userId}")]
        public IActionResult GetAdsToBeReviewed(Guid userId)
        {
            return Ok(_myadsService.GetAdsToBeReviewed(userId));
        }

        [HttpGet]
        [Route("getRunningAds/{userId}")]
        public IActionResult GetRunningAds(Guid userId)
        {
            return Ok(_myadsService.GetRunningAds(userId));
        }

        [HttpGet]
        [Route("getCompletedAds/{userId}")]
        public IActionResult GetCompletedAds(Guid userId)
        {
            return Ok(_myadsService.GetCompletedAds(userId));
        }
    }
}
