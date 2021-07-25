using System;
using adv_web_dev.Data;
using adv_web_dev.Data.Entities;
using adv_web_dev.Interfaces;
using adv_web_dev.Models;
using Dapper;

namespace adv_web_dev.Services
{
    public class ReviewAdService : IReviewAdService
    {
        private readonly WebDevDbContext _context;

        public ReviewAdService(WebDevDbContext context)
        {
            _context = context;
        }

        public ReviewAdResponse ReviewAd(ReviewedAd ad)
        {
            var adId = _context.Connection.ExecuteScalar<Guid>(@"
                INSERT INTO ReviewedAds(UserAdId, Comments, Approved, Rejected, ReviewedDate)
                OUTPUT Inserted.ID
                VALUES(@UserAdId, @Comments, @Approved, @Rejected, @ReviewedDate)",
                new
                {
                    UserAdId = ad.UserAd.Id,
                    Comments = ad.Comments,
                    Approved = ad.Approved,
                    Rejected = ad.Rejected,
                    ReviewedDate = DateTime.UtcNow
                }
            );

            if (ad.Approved)
            {
                _context.Connection.ExecuteScalar<Guid>(@"
                    INSERT INTO AdvWebDev.dbo.ScheduledAds (UserAdId, Running, Completed)
                    VALUES(@UserAdId, @Running, @Completed);",
                    new ScheduledInsert
                    {
                        Completed = false,
                        UserAdId = ad.UserAd.Id,
                        Running = false,
                    });
            }

            return new ReviewAdResponse
            {
                AdId = adId,
                Comments = ad.Comments,
                Accepted = ad.Approved,
                Rejected = ad.Rejected
            };
        }
    }
}