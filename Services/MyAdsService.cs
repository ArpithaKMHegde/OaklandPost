using System;
using System.Collections.Generic;
using System.Linq;
using adv_web_dev.Data;
using adv_web_dev.Models;
using Dapper;
using adv_web_dev.Interfaces;

namespace adv_web_dev.Services
{
    public class MyAdsService : IMyAdsService
    {
        private readonly WebDevDbContext _context;

        public MyAdsService(WebDevDbContext context)
        {
            _context = context;
        }

        public List<MyAdsInsertsAvailableModel> GetAvailableInserts(Guid userId)
        {
            var query = _context.Connection.Query<MyAdsInsertsAvailableModel>(@"
                select ui.Id, pi.PageType, p.Title from UserInserts ui
                JOIN PackageInserts pi ON ui.PackageInsertId = pi.ID
                JOIN UserPurchasedPackage upp on pi.PackageId = upp.PackageId AND upp.UserId = ui.UserId
                JOIN Package p on p.ID = pi.PackageId
                WHERE ui.UserAdId IS NULL AND upp.UserId = @userId",
                new { userId });

            return query.ToList();
        }

        public List<MyAdsRunningAdsModel> GetAdsToBeReviewed(Guid userId)
        {
            var query = _context.Connection.Query<MyAdsRunningAdsModel>(@"
                select pi.Id, pi.PageType, p.Title, ui.UserAdId from UserInserts ui
                JOIN PackageInserts pi ON ui.PackageInsertId = pi.ID
                JOIN UserPurchasedPackage upp on pi.PackageId = upp.PackageId AND upp.UserId = ui.UserId
                JOIN Package p on p.ID = pi.PackageId
                AND ui.UserAdId not in (SELECT UserAdId FROM ReviewedAds)
                AND ui.UserAdId IS NOT NULL AND upp.UserId = @userId", new { userId });

            return query.ToList();
        }

        public List<MyAdsRunningAdsModel> GetRunningAds(Guid userId)
        {
            var query = _context.Connection.Query<MyAdsRunningAdsModel>(@"
                select pi.Id, pi.PageType, p.Title, ua.StartDate, ua.EndDate, ui.UserAdId from UserInserts ui
                JOIN PackageInserts pi ON ui.PackageInsertId = pi.ID
                JOIN UserAds ua ON ua.PackageInsertId = pi.ID
                JOIN UserPurchasedPackage upp on pi.PackageId = upp.PackageId AND upp.UserId = ui.UserId
                JOIN Package p on p.ID = pi.PackageId
                JOIN ScheduledAds sa on ui.UserAdId = sa.UserAdId AND upp.UserId = @userId
                WHERE CAST(ua.EndDate as DATE) >= (SELECT CAST(GETDATE() AS DATE))",
                new { userId });

            return query.ToList();
        }

        public List<MyAdsRunningAdsModel> GetCompletedAds(Guid userId)
        {
            var query = _context.Connection.Query<MyAdsRunningAdsModel>(@"
                SELECT pi.Id, pi.PageType, p.Title, ui.UserAdId, ua.StartDate, ua.EndDate FROM UserInserts ui
                JOIN PackageInserts pi ON ui.PackageInsertId = pi.ID
                JOIN UserAds ua ON pi.ID = ua.PackageInsertId
                JOIN UserPurchasedPackage upp on pi.PackageId = upp.PackageId AND upp.UserId = ui.UserId
                JOIN Package p ON p.ID = pi.PackageId
                JOIN ReviewedAds ra ON ua.ID = ra.UserAdId
                WHERE upp.UserId = @userId AND ra.Approved = 1 AND CAST(ua.EndDate as DATE) <= (SELECT CAST(GETDATE() AS DATE)) OR ra.Rejected = 1;",
                new { userId = userId.ToString() });

            return query.ToList();
        }
    }
}
