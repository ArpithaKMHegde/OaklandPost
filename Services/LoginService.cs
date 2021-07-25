using adv_web_dev.Data;
using adv_web_dev.Interfaces;
using adv_web_dev.Models;
using Dapper;

namespace adv_web_dev.Services
{
    public class LoginService : ILoginService
    {
        private readonly WebDevDbContext _context;

        public LoginService(WebDevDbContext context)
        {
            _context = context;
        }

        public LoginResponse LoginUser(LoginModel user)
        {
            var existingUser = _context.Connection.QueryFirstOrDefault<LoginModel>(@"
                SELECT * from Users
                WHERE email = @email", new { user.Email }
            );

            if (existingUser != null)
            {
                return new LoginResponse
                {
                    UserAccount = existingUser,
                    AlreadyExists = true
                };
            }
            return new LoginResponse
            {
                UserAccount = user,
                AlreadyExists = false
            };
        }

        public void UpdateAccountInfo(LoginModel accountInfo)
        {
            _context.Connection.Query(@"
                UPDATE Users
                SET email=@Email, firstName = @FirstName, lastName = @LastName, password = @Password
                WHERE ID = @ID",
                new {
                        ID = accountInfo.Id,
                        Email = accountInfo.Email,
                        FirstName = accountInfo.FirstName,
                        LastName = accountInfo.LastName,
                        Password = accountInfo.Password
                    }
            );
        }
    }
}
