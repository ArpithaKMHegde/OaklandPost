using System;
using adv_web_dev.Interfaces;
using adv_web_dev.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace adv_web_dev.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly ILogger<LoginController> _logger;
        private readonly ILoginService _loginService;

        public LoginController(ILogger<LoginController> logger, ILoginService loginService)
        {
            _logger = logger;
            _loginService = loginService;
        }

        [HttpPost]
        public IActionResult PostUser(LoginModel model)
        {
            try
            {
                var user = (_loginService.LoginUser(model));
                return Ok(user);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        [Route("update")]
        public IActionResult UpdateAccountInfo(LoginModel accountInfo)
        {
            try
            {
                _loginService.UpdateAccountInfo(accountInfo);
                return Ok();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}