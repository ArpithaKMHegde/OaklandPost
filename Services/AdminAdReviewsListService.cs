using System.Collections.Generic;
using System.Linq;
using adv_web_dev.Data;
using adv_web_dev.Models;
using Dapper;
using adv_web_dev.Interfaces;

namespace adv_web_dev.Services
{
    public class AdminAdReviewsListService : IAdminAdReviewsListService
    {
        private readonly WebDevDbContext _context;

        public AdminAdReviewsListService(WebDevDbContext context)
        {
            _context = context;
        }

        public List<AdminAdReviewsListModel> GetOpenAdListsData()
        {
            var query = _context.Connection.Query<AdminAdReviewsListModel>(@"
                SELECT ua.*, pi.PageType, p.Title, u.email, u.firstName, u.lastName FROM UserInserts ui
                JOIN UserAds ua ON ui.UserAdId = ua.ID
                JOIN PackageInserts pi ON ui.PackageInsertId = pi.ID
                JOIN Package p ON pi.PackageId = p.ID
                JOIN UserPurchasedPackage upp on pi.PackageId = upp.PackageId AND upp.UserId = ui.UserId
                JOIN Users u ON upp.UserId = u.ID
                WHERE ua.ID NOT IN (SELECT UserAdId FROM ReviewedAds ra)");
            return query.ToList();
        }

        public List<AdminAdReviewsListModel> GetConfirmedAdListsData()
        {
            var query = _context.Connection.Query<AdminAdReviewsListModel>(@"
                SELECT ua.*, pi.PageType, p.Title, u.email, u.firstName, u.lastName, ra.ReviewedDate FROM UserInserts ui
                INNER JOIN UserAds ua ON ui.UserAdId = ua.ID
                INNER JOIN ReviewedAds ra ON ua.ID = ra.UserAdId
                INNER JOIN PackageInserts pi ON ui.PackageInsertId = pi.ID
                INNER JOIN Package p ON pi.PackageId = p.ID
                JOIN UserPurchasedPackage upp on pi.PackageId = upp.PackageId AND upp.UserId = ui.UserId
                INNER JOIN Users u ON upp.UserId = u.ID
                WHERE ra.Approved = 1");
            return query.ToList();
        }

        public List<AdminAdReviewsListModel> GetDeniedAdListsData()
        {
            var query = _context.Connection.Query<AdminAdReviewsListModel>(@"
                SELECT ua.*, pi.PageType, p.Title, u.email, u.firstName, u.lastName, ra.ReviewedDate FROM UserInserts ui
                INNER JOIN UserAds ua ON ui.UserAdId = ua.ID
                INNER JOIN ReviewedAds ra ON ua.ID = ra.UserAdId
                INNER JOIN PackageInserts pi ON ui.PackageInsertId = pi.ID
                INNER JOIN Package p ON pi.PackageId = p.ID
                JOIN UserPurchasedPackage upp on pi.PackageId = upp.PackageId AND upp.UserId = ui.UserId
                INNER JOIN Users u ON upp.UserId = u.ID
                WHERE ra.Rejected = 1");

            return query.ToList();
        }
    }
}
