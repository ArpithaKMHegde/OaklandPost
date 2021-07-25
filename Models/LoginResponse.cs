namespace adv_web_dev.Models
{
    public class LoginResponse
    {
        public LoginModel UserAccount {get;set;}
        public bool AlreadyExists {get;set;}
    }
}