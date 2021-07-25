using System;
using adv_web_dev.Interfaces;
using adv_web_dev.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace adv_web_dev.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PackageListController : ControllerBase
    {
        private readonly ILogger<PackageListController> _logger;
        private readonly IPackageListService _packageListService;

        public PackageListController(ILogger<PackageListController> logger, IPackageListService packageListService)
        {
            _logger = logger;
            _packageListService = packageListService;
        }

        [HttpPost]
        public IActionResult SubmitPackage(PackageModel packageInfo)
        {
            try
            {
                _packageListService.SubmitPackage(packageInfo);
                return Ok();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet]
        public IActionResult GetPackageList()
        {
            try
            {
                var packageList = _packageListService.DownloadPackages();
                return Ok(packageList);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet]
        [Route("package/{packageId}")]
        public IActionResult GetPackage([FromRoute] Guid id)
        {
            try
            {
                var package = _packageListService.GetPackage(id);
                return Ok(package);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        [Route("invalidate/{packageId}")]
        public IActionResult InvalidatePackage([FromRoute] string packageId)
        {
            try
            {
                _packageListService.InvalidatePackage(packageId);
                return Ok();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
