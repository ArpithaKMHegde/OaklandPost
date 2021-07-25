using System;
using adv_web_dev.Interfaces;
using adv_web_dev.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace adv_web_dev.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserRegistrationController : ControllerBase
    {
        private readonly ILogger<UserRegistrationController> _logger;
        private readonly IUserRegistrationService _userRegistrationService;

        public UserRegistrationController(ILogger<UserRegistrationController> logger, IUserRegistrationService userRegistrationService)
        {
            _logger = logger;
            _userRegistrationService = userRegistrationService;
        }

        [HttpPost]
        [Route("register")]
        public IActionResult PostUser(UserRegistrationModel model)
        {

            try
            {
                var user = (_userRegistrationService.RegisterUser(model));
                return Ok(user);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
