using System;
using System.Collections.Generic;
using System.Linq;
using adv_web_dev.Data;
using adv_web_dev.Interfaces;
using adv_web_dev.Models;
using Dapper;

namespace adv_web_dev.Services
{
    public class PackageListService : IPackageListService
    {
        private readonly WebDevDbContext _context;

        public PackageListService(WebDevDbContext context)
        {
            _context = context;
        }

        public void SubmitPackage(PackageModel packageInfo)
        {
            var format = "yyyy-MM-dd HH:mm:ss:fff";
            var stringDate = DateTime.Now.ToString(format);
            var submitPackage = _context.Connection.ExecuteScalar<Guid>(@"
            INSERT INTO Package(Title, CreatedDate, IsColor, TimeLength, Price, UnitOfTime, Invalid)
            OUTPUT Inserted.ID
            VALUES(@Title, @CreatedDate, @IsColor, @TimeLength, @Price, @UnitOfTime, @Invalid)",
            new
            {
                Title = packageInfo.Title,
                CreatedDate = stringDate,
                IsColor = packageInfo.IsColor,
                TimeLength = packageInfo.TimeLength,
                Price = packageInfo.Price,
                UnitOfTime = packageInfo.UnitOfTime,
                Invalid = 0
            });
            foreach (var insert in packageInfo.Inserts)
            {
                _context.Connection.ExecuteScalar(@"
                    INSERT INTO PackageInserts(PackageId, PageType)
                    VALUES(@PackageId, @PageType)",
                    new
                    {
                        PackageId = submitPackage,
                        PageType = insert.PageType
                    });
            }
        }

        public PackageListResponse DownloadPackages()
        {
            var packageListQuery = _context.Connection.Query<PackageModel, PackageInsert, PackageModel>(@"
                SELECT * from Package p
                JOIN PackageInserts pi on pi.PackageId = p.Id
                WHERE p.Invalid = 0;",
                (PackageModel p, PackageInsert pi) =>
                {
                    p.Inserts = new List<PackageInsert> { pi };
                    return p;
                });

            var packageList = packageListQuery.GroupBy(x => x.Id).Select(x =>
            {
                var groupPackage = x.FirstOrDefault();
                groupPackage.Inserts = x.SelectMany(x => x.Inserts).ToList();
                return groupPackage;
            }).ToList();

            return new PackageListResponse
            {
                PackageList = packageList
            };
        }

        public PackageModel GetPackage(Guid id)
        {
            var packageQuery = _context.Connection.QueryFirstOrDefault<PackageModel>(@"
                SELECT * from Package p
                WHERE p.ID = @id;", new { id });

            return new PackageModel
            {
                Id = id,
                Title = packageQuery.Title,
                CreatedDate = packageQuery.CreatedDate,
                IsColor = packageQuery.IsColor,
                TimeLength = packageQuery.TimeLength,
                Price = packageQuery.Price,
                UnitOfTime = packageQuery.UnitOfTime,
                Inserts = packageQuery.Inserts,
                Invalid = packageQuery.Invalid
            };
        }

        public void InvalidatePackage(string packageId)
        {
            _context.Connection.Query(@"UPDATE Package SET Invalid = 1 WHERE ID = @ID", new { ID = packageId });
        }
    }
}
