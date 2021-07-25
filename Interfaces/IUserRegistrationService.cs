using adv_web_dev.Models;

namespace adv_web_dev.Interfaces
{
    public interface IUserRegistrationService
    {
        RegisterUserResponse RegisterUser(UserRegistrationModel user);
    }
}
