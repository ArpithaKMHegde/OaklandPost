using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using adv_web_dev.Interfaces;
using adv_web_dev.Models;
using adv_web_dev.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace adv_web_dev.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdFileController : ControllerBase
    {
        private readonly ILogger<AdFileController> _logger;
        private readonly IAdFileManagementService _adFileManagementService;

        public AdFileController(ILogger<AdFileController> logger, IAdFileManagementService adFileManagementService)
        {
            _logger = logger;
            _adFileManagementService = adFileManagementService;
        }

        [HttpPost]
        [Route("upload/file")]
        public async Task<IActionResult> UploadFile(IFormFile file)
        {
            var id = (await _adFileManagementService.SaveFileAsync(file)).Id;
            return Ok(new AdUploadFileResponse
            {
                Id = id,
                Name = file.FileName
            });
        }

        [HttpGet]
        [Route("download/file/{id}")]
        public async Task<IActionResult> DownloadFile(Guid id)
        {
            var adFileDownload = await _adFileManagementService.DownloadFile(id);
            return File(adFileDownload.Stream, "application/octet-stream", adFileDownload.FileName);
        }
    }
}