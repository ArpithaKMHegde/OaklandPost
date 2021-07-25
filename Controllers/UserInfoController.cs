using System;
using adv_web_dev.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace adv_web_dev.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserInfoController : ControllerBase
    {
        private readonly ILogger<UserInfoController> _logger;
        private readonly IUserInfoService _userInfoService;

        public UserInfoController(ILoggerFactory loggerFactory, IUserInfoService userInfoService)
        {
            _logger = loggerFactory.CreateLogger<UserInfoController>();
            _userInfoService = userInfoService;
        }

        [HttpGet]
        public IActionResult GetAdminList()
        {
            try
            {
                var adminList = _userInfoService.AdminList();
                return Ok(adminList);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }
    }
}
