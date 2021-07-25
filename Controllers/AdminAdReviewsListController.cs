using adv_web_dev.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace adv_web_dev.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminAdReviewsListController : ControllerBase
    {
        private readonly ILogger<AdminAdReviewsListController> _logger;
        private readonly IAdminAdReviewsListService _adReviewsListService;

        public AdminAdReviewsListController(ILogger<AdminAdReviewsListController> logger, IAdminAdReviewsListService adReviewsListService)
        {
            _logger = logger;
            _adReviewsListService = adReviewsListService;
        }

        [HttpGet]
        [Route("getOpenAds")]
        public IActionResult GetOpenAds()
        {
            return Ok(_adReviewsListService.GetOpenAdListsData());
        }

        [HttpGet]
        [Route("getConfirmedAds")]
        public IActionResult GetConfirmedAds()
        {
            return Ok(_adReviewsListService.GetConfirmedAdListsData());
        }

        [HttpGet]
        [Route("getDeniedAds")]
        public IActionResult GetDeniedAds()
        {
            return Ok(_adReviewsListService.GetDeniedAdListsData());
        }
    }
}
