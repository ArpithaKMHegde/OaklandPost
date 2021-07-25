using System;
using System.Threading.Tasks;
using adv_web_dev.Interfaces;
using adv_web_dev.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace adv_web_dev.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdController : ControllerBase
    {
        private readonly ILogger<AdController> _logger;
        private readonly IUserAdService _userAdService;

        public AdController(ILoggerFactory loggerFactory, IUserAdService userAdService)
        {
            _logger = loggerFactory.CreateLogger<AdController>();
            _userAdService = userAdService;
        }

        [HttpGet]
        [Route("review/open/{id}")]
        public async Task<IActionResult> GetOpenAds(Guid id)
        {
            var ads = await _userAdService.GetAd(id);
            return Ok(ads);
        }

        [HttpGet]
        [Route("review/detail/{id}")]
        public IActionResult GetClientViewAd(Guid id)
        {
            var adInfo = _userAdService.GetClientViewAd(id);
            return Ok(adInfo);
        }


        [HttpPut]
        public async Task<IActionResult> CreateAd(UserAdCreate userAd)
        {
            var newAd = await _userAdService.CreateAd(userAd);
            return Ok(newAd);
        }


        [HttpPut]
        [Route("user/package")]
        public async Task<IActionResult> CreateUserAdPackage(CreateUserPackageRequest userPackageRequest)
        {
            await _userAdService.CreateUserAdPackage(userPackageRequest);
            return Ok();
        }

        [HttpPut]
        [Route("link/ad/files")]
        public async Task<IActionResult> LinkAdFiles(LinkAdFilesRequest linkAdFiles)
        {
            await _userAdService.LinkAdFiles(linkAdFiles.UserAdId, linkAdFiles.FileUploadIds);
            return Ok();
        }

        [HttpGet]
        [Route("insertinfo/{insertId}")]
        public async Task<IActionResult> GetInsertInfo(Guid insertId)
        {
            var insert = await _userAdService.GetInsertInfo(insertId);
            return Ok(insert);
        }

        [HttpGet]
        [Route("user/email/{userAdId}")]
        public IActionResult GetEmailByUserAdId(Guid userAdId)
        {
            var userEmail = _userAdService.GetEmailByUserAdId(userAdId);
            return new JsonResult(userEmail);
        }
    }
}
