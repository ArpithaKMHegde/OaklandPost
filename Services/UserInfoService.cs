using System.Linq;
using adv_web_dev.Data;
using adv_web_dev.Data.Entities;
using adv_web_dev.Interfaces;
using adv_web_dev.Models;
using Dapper;

namespace adv_web_dev.Services
{
    public class UserInfoService : IUserInfoService
    {
        private readonly WebDevDbContext _context;

        public UserInfoService(WebDevDbContext context)
        {
            _context = context;
        }

        public AdminListResponse AdminList()
        {
            var adminList = _context.Connection.Query<User>(@"
                SELECT * from Users
                WHERE isAdmin = 1");
            
            return new AdminListResponse
            {
                AdminList = adminList.ToList()
            };
        }
    }
}
