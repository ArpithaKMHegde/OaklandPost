using System;
using adv_web_dev.Data.Entities;
using adv_web_dev.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace adv_web_dev.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ReviewAdController : ControllerBase
    {
        private readonly ILogger<ReviewAdController> _logger;
        private readonly IReviewAdService _reviewAdService;

        public ReviewAdController(ILogger<ReviewAdController> logger, IReviewAdService reviewAdService)
        {
            _logger = logger;
            _reviewAdService = reviewAdService;
        }

        [HttpPost]
        public IActionResult PostUser(ReviewedAd model)
        {

            try
            {
                var user = (_reviewAdService.ReviewAd(model));
                return Ok(user);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
