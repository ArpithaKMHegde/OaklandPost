using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using adv_web_dev.Data;
using Dapper;
using adv_web_dev.Interfaces;
using adv_web_dev.Data.Entities;
using Microsoft.EntityFrameworkCore;
using System.Transactions;
using adv_web_dev.Models;
using adv_web_dev.Data.Models;

namespace adv_web_dev.Services
{
    public class UserAdService : IUserAdService
    {
        public static string FileManagementLocation = "ad-upload-files/";

        private readonly WebDevDbContext _context;

        public UserAdService(WebDevDbContext context)
        {
            _context = context;
        }

        public Task<UserAd> CreateAd(UserAdCreate userAdCreate)
        {
            using (var transaction = new TransactionScope())
            {

                var id = _context.Connection.ExecuteScalar<Guid>(@"
                INSERT INTO UserAds (SubmittedDate, StartDate, EndDate, Location, PackageInsertId)
                OUTPUT inserted.Id
                Values(@SubmittedDate, @StartDate, @EndDate, @Location, @PackageInsertId);", new
                {
                    SubmittedDate = userAdCreate.UserAd.SubmittedDate,
                    StartDate = userAdCreate.UserAd.StartDate,
                    EndDate = userAdCreate.UserAd.EndDate,
                    Location = userAdCreate.UserAd.Location,
                    PackageInsertId = userAdCreate.InsertId
                });

                _context.Connection.Execute(@"
                UPDATE AdvWebDev.dbo.UserInserts
                SET UserAdId=@id
                WHERE ID=@UserInsertId
                ", new
                {
                    id,
                    userAdCreate.InsertId,
                    userAdCreate.UserInsertId
                });

                userAdCreate.UserAd.Id = id;

                transaction.Complete();
                return Task.FromResult(userAdCreate.UserAd);
            }
        }

        public Task LinkAdFiles(Guid userAdId, List<Guid> fileUploadIds)
        {
            var rows = fileUploadIds.Select(x => new
            {
                userAdId = userAdId,
                fileUploadId = x
            });

            var id = _context.Connection.Execute(@"
                INSERT INTO AdFileUploads (UserFileUploadId, UserAdId)
                Values(@fileUploadId, @userAdId);", rows);

            return Task.CompletedTask;
        }

        public Task<List<UserAd>> GetOpenAds()
        {
            var userAds = _context.Connection.Query<UserAd>(@"
                SELECT * FROM UserAds ua
                LEFT JOIN ReviewedAds ra on ua.Id = ra.UserAdId
                WHERE ra.Id IS NULL").ToList();

            return Task.FromResult(userAds);
        }

        public Task<UserAd> GetAd(Guid id)
        {
            var ad = _context.Connection.QueryFirstOrDefault<UserAd>(@"
                SELECT ua.* FROM UserAds ua 
                WHERE ua.ID = @id", new { id });

            var adReviewStatus = _context.Connection.QueryFirstOrDefault<ReviewedAd>(@"
                SELECT ra.* FROM ReviewedAds ra 
                WHERE ra.UserAdId = @id", new { id = id });

            var adFiles = _context.Connection.Query<AdFileUpload, UserFileUpload, AdFileUpload>(@"
                SELECT  afu.*, ufu.* FROM AdFileUploads afu 
                JOIN UserFileUploads ufu on ufu.ID = afu.UserFileUploadId
                JOIN UserAds ua on afu.UserAdId = ua.ID 
                Where ua.id = @id",
                (afu, ufu) => new AdFileUpload
                {
                    Id = afu.Id,
                    UserAd = ad,
                    UserAdId = ad.Id,
                    UserFileUpload = ufu,
                    UserFileUploadId = ufu.Id
                }, new { id = id });

            ad.Files = adFiles.ToList();
            ad.ReviewedAd = adReviewStatus;
            return Task.FromResult(ad);
        }

        public ClientViewAdModel GetClientViewAd(Guid id)
        {
            var ad = _context.Connection.QueryFirstOrDefault<UserAd>(@"
                SELECT ua.* FROM UserAds ua 
                LEFT JOIN ReviewedAds ra  
                ON ua.ID = ra.UserAdId
                WHERE ua.ID = @id", new { id });

            var adReviewStatus = _context.Connection.QueryFirstOrDefault<ReviewedAd>(@"
                SELECT ra.* FROM ReviewedAds ra 
                WHERE ra.UserAdId = @id", new { id = id });

            var adFiles = _context.Connection.Query<AdFileUpload, UserFileUpload, AdFileUpload>(@"
                SELECT  afu.*, ufu.* FROM AdFileUploads afu 
                JOIN UserFileUploads ufu on ufu.ID = afu.UserFileUploadId
                JOIN UserAds ua on afu.UserAdId = ua.ID 
                Where ua.id = @id",
                (afu, ufu) => new AdFileUpload
                {
                    Id = afu.Id,
                    UserAd = ad,
                    UserAdId = ad.Id,
                    UserFileUpload = ufu,
                    UserFileUploadId = ufu.Id
                }, new { id = id });

            var packageInfo = _context.Connection.QueryFirstOrDefault<PackageModel>(@"
                SELECT p.* from Package p
                join PackageInserts pi2 on p.ID = pi2.PackageId
                join UserInserts ui on pi2.ID = ui.PackageInsertId 
                join UserAds ua on ui.UserAdId = ua.ID 
                where ua.id = @id", new { id });

            var packageInsert = _context.Connection.QueryFirstOrDefault<PackageInsert>(@"
                SELECT pi.* from PackageInserts pi
                join Package p on p.ID = pi.PackageId
                join UserInserts ui on pi.ID = ui.PackageInsertId 
                join UserAds ua on ui.UserAdId = ua.ID 
                where ua.id = @id", new { id });

            ad.ReviewedAd = adReviewStatus;
            ad.Files = adFiles.ToList();

            var clientViewAd = new ClientViewAdModel
            {
                UserAd = ad,
                PageType = packageInsert.PageType,
                Package = packageInfo
            };

            return clientViewAd;
        }

        public async Task CreateUserAdPackage(CreateUserPackageRequest userAdPackageRequest)
        {
            using (var transaction = new TransactionScope())
            {
                foreach (var userAdPackage in userAdPackageRequest.Ads)
                {
                    var id = _context.Connection.ExecuteScalar<Guid>(@"
                        INSERT INTO UserAds (SubmittedDate, StartDate, EndDate, Location, PackageInsertId)
                        OUTPUT inserted.Id
                        Values(@SubmittedDate, @StartDate, @EndDate, @Location, @InsertId);", userAdPackage);

                    _context.Connection.Execute(@"
                        INSERT INTO UserInserts (UserId, UserAdId, PackageInsertId)
                        Values (@UserId, @UserAdId, @PackageInsertId);",
                        new
                        {
                            UserAdId = id,
                            UserId = userAdPackageRequest.UserId,
                            PackageInsertId = userAdPackage.InsertId
                        });

                    await LinkAdFiles(id, userAdPackage.FileIds);
                }

                var packageInserts = _context.Connection.Query<PackageInsert>(@"
                    SELECT pi.* FROM PackageInserts pi
                    JOIN Package p on p.Id = pi.PackageId
                    WHERE p.Id = @PackageId",
                    new
                    {
                        PackageId = userAdPackageRequest.PackageId
                    });

                var packageInsertIds = packageInserts.Select(x => x.Id);
                var userInserts = userAdPackageRequest.Ads.Select(x => x.InsertId);
                var insertsStillAvailable = packageInsertIds.Except(userInserts);

                foreach (var insert in insertsStillAvailable)
                {
                    _context.Connection.ExecuteScalar<Guid>(@"
                    INSERT INTO UserInserts (UserId, PackageInsertId)
                    Values (@UserId, @PackageInsertId)
                ", new
                    {
                        PackageInsertId = insert,
                        UserId = userAdPackageRequest.UserId
                    });
                }

                var paymentInformationId = _context.Connection.ExecuteScalar<Guid>(@"
                    INSERT INTO AdvWebDev.dbo.PaymentInformation (AddressLine1, AddressLine2, City, State, Zip, CreditCardNumber, CreditCardCode, ExpirationDate, FullName)
                    OUTPUT inserted.Id
                    VALUES(@AddressLine1, @AddressLine2, @City, @State, @Zip, @CreditCardNumber, @CreditCardCode, @ExpirationDate, @FullName);
                ", userAdPackageRequest.PaymentInformation);

                _context.Connection.ExecuteScalar<Guid>(@"
                    INSERT INTO AdvWebDev.dbo.UserPurchasedPackage(UserId, PackageId, PurchaseDate, PaymentInformationId)
                    OUTPUT inserted.Id
                    VALUES(@UserId, @PackageId, @PurchaseDate, @PaymentInformationId);
                ", new UserPurchasedPackage
                {
                    PackageId = userAdPackageRequest.PackageId,
                    PaymentInformationId = paymentInformationId,
                    PurchaseDate = DateTime.UtcNow,
                    UserId = userAdPackageRequest.UserId
                });

                transaction.Complete();
            }
        }

        public Task<InsertInfo> GetInsertInfo(Guid userInsertId)
        {
            var insertInfo = _context.Connection.Query<PackageInsert, PackageModel, UserInsert, InsertInfo>(@"
                SELECT * FROM PackageInserts pi
                JOIN Package p on pi.PackageId = p.Id
                JOIN UserInserts ui on pi.id = ui.PackageInsertId
                Where ui.Id = @userInsertId",
                (pi, p, ui) => new InsertInfo
                {
                    Insert = pi,
                    Package = p,
                    UserInsertId = ui.Id
                }, new
                {
                    userInsertId
                }).FirstOrDefault();

            return Task.FromResult(insertInfo);
        }

        public string GetEmailByUserAdId(Guid userAdId)
        {
            var userEmail = _context.Connection.QueryFirstOrDefault<string>(@"
                SELECT u.email FROM UserInserts ui
                JOIN PackageInserts pi ON ui.PackageInsertId = pi.Id
                JOIN UserPurchasedPackage upp ON pi.PackageId = upp.PackageId
                JOIN Users u ON upp.UserId = u.ID
                WHERE ui.UserAdId = @userAdId", new { userAdId });

            return userEmail;
        }
    }
}
