using adv_web_dev.Models;

namespace adv_web_dev.Interfaces
{
    public interface ILoginService
    {
        LoginResponse LoginUser(LoginModel user);
        void UpdateAccountInfo(LoginModel accountInfo);
    }
}
