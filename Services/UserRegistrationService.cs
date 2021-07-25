using System;
using adv_web_dev.Data;
using adv_web_dev.Models;
using Dapper;
using adv_web_dev.Interfaces;

namespace adv_web_dev.Services
{
    public class UserRegistrationService : IUserRegistrationService
    {
        private readonly WebDevDbContext _context;

        public UserRegistrationService(WebDevDbContext context)
        {
            _context = context;
        }

        public RegisterUserResponse RegisterUser(UserRegistrationModel user)
        {

            var existingUser = _context.Connection.QueryFirstOrDefault<UserRegistrationModel>(@"
                SELECT * from Users
                WHERE email = @email", new { user.email }
            );

            if (existingUser != null)
            {
                return new RegisterUserResponse
                {
                    UserRecord = existingUser,
                    AlreadyExists = true
                };
            }
            var id = _context.Connection.ExecuteScalar<Guid>(@"
                INSERT INTO Users (firstName, lastName, email, password, isAdmin)
                OUTPUT Inserted.ID
                VALUES (@firstName, @lastName, @email, @password, @isAdmin);", user);

            user.id = id;
            return new RegisterUserResponse
            {
                UserRecord = user,
                AlreadyExists = false
            };
        }
    }
}