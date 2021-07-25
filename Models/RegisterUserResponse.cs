namespace adv_web_dev.Models
{
    public class RegisterUserResponse
    {
        public UserRegistrationModel UserRecord {get;set;}
        public bool AlreadyExists {get;set;}
    }
}