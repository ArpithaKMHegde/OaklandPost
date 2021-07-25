using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Transactions;
using adv_web_dev.Models;
using Dapper;

namespace adv_web_dev.Data
{
    public static class DbInitializer
    {
        public static void Initialize(WebDevDbContext context)
        {
            context.Database.EnsureCreated();

            using (var transaction = new TransactionScope())
            {

                // Create Tables
                context.Connection.ExecuteIfTableMissing($@"
                CREATE TABLE AdvWebDev.dbo.Package (
	                ID UNIQUEIDENTIFIER DEFAULT NEWSEQUENTIALID() PRIMARY KEY,
	                Title VARCHAR(100) NOT NULL,
                    CreatedDate datetime2 NOT NULL,
                    IsColor bit NOT NULL,
                    TimeLength int NOT NULL,
                    UnitOfTime VARCHAR(6) NOT NULL,
                    Price decimal(8, 2) NOT NULL,
                    Invalid bit NOT NULL)",
                    new
                    {
                        Table = "Package",
                        Schema = "dbo"
                    });

                //Single package will have multiple inserts
                context.Connection.ExecuteIfTableMissing($@"
                CREATE TABLE AdvWebDev.dbo.PackageInserts (
	                ID UNIQUEIDENTIFIER DEFAULT NEWSEQUENTIALID() PRIMARY KEY,
	                PackageId UNIQUEIDENTIFIER NOT NULL,
                    PageType VARCHAR(50) NOT NULL,
                    FOREIGN KEY (PackageId) REFERENCES AdvWebDev.dbo.Package(ID))",
                    new
                    {
                        Table = "PackageInserts",
                        Schema = "dbo"
                    });

                context.Connection.ExecuteIfTableMissing($@"
                CREATE TABLE AdvWebDev.dbo.UserFileUploads (
	                ID UNIQUEIDENTIFIER DEFAULT NEWSEQUENTIALID() PRIMARY KEY,
	                StorageFileName varchar(255) NOT NULL,
	                OriginalFileName varchar(255) NOT NULL)",
                        new
                        {
                            Table = "UserFileUploads",
                            Schema = "dbo"
                        });

                context.Connection.ExecuteIfTableMissing($@"CREATE TABLE AdvWebDev.dbo.UserAds (
                ID UNIQUEIDENTIFIER DEFAULT NEWSEQUENTIALID() PRIMARY KEY,
                SubmittedDate datetime2 NOT NULL,
                StartDate datetime2 NOT NULL,
                EndDate datetime2 NOT NULL,
                Location varchar(255) NOT NULL,
                PackageInsertId UNIQUEIDENTIFIER NOT NULL,
                FOREIGN KEY (PackageInsertId) REFERENCES AdvWebDev.dbo.PackageInserts(ID))",
                    new
                    {
                        Table = "UserAds",
                        Schema = "dbo"
                    });

                context.Connection.ExecuteIfTableMissing($@"
                CREATE TABLE AdvWebDev.dbo.AdFileUploads (
	                ID UNIQUEIDENTIFIER DEFAULT NEWSEQUENTIALID() PRIMARY KEY,
	                UserFileUploadId UNIQUEIDENTIFIER NOT NULL,
	                UserAdId UNIQUEIDENTIFIER NOT NULL,
                    FOREIGN KEY (UserAdId) REFERENCES AdvWebDev.dbo.UserAds(ID),
                    FOREIGN KEY (UserFileUploadId) REFERENCES AdvWebDev.dbo.UserFileUploads(ID))",
                    new
                    {
                        Table = "AdFileUploads",
                        Schema = "dbo"
                    });

                context.Connection.ExecuteIfTableMissing($@"
                CREATE TABLE AdvWebDev.dbo.ReviewedAds (
	                ID UNIQUEIDENTIFIER DEFAULT NEWSEQUENTIALID() PRIMARY KEY,
	                UserAdId UNIQUEIDENTIFIER NOT NULL,
                    ReviewedDate datetime2 NOT NULL,
                    Comments VARCHAR(256) NULL,
                    Approved bit NULL,
                    Rejected bit NULL,
                    FOREIGN KEY (UserAdId) REFERENCES AdvWebDev.dbo.UserAds(ID))",
                    new
                    {
                        Table = "ReviewedAds",
                        Schema = "dbo"
                    });

                context.Connection.ExecuteIfTableMissing($@"
                CREATE TABLE AdvWebDev.dbo.Users (
	                ID UNIQUEIDENTIFIER DEFAULT NEWSEQUENTIALID() PRIMARY KEY,
	                email VARCHAR(256) NOT NULL,
                    firstName VARCHAR(256) NULL,
                    lastName VARCHAR(256) NULL,
                    password VARCHAR(256) NULL,
                    isAdmin bit NOT NULL)",
                    new
                    {
                        Table = "Users",
                        Schema = "dbo"
                    });


                //Created for testing MyAds -- Can be deleted later once User table is incorporated
                context.Connection.ExecuteIfTableMissing($@"
                CREATE TABLE AdvWebDev.dbo.LoginUser (
	                ID UNIQUEIDENTIFIER DEFAULT NEWSEQUENTIALID() PRIMARY KEY,
	                Name VARCHAR(100) NOT NULL)",
                    new
                    {
                        Table = "LoginUser",
                        Schema = "dbo"
                    });

                //This is an xtended table of 'UserAds' to map user, selected insert and Ad.
                context.Connection.ExecuteIfTableMissing($@"
                CREATE TABLE AdvWebDev.dbo.ScheduledAds (
	                ID UNIQUEIDENTIFIER DEFAULT NEWSEQUENTIALID() PRIMARY KEY,
	                UserAdId UNIQUEIDENTIFIER NOT NULL,
                    Running bit NOT NULL,
                    Completed bit NULL,
                    FOREIGN KEY (UserAdId) REFERENCES AdvWebDev.dbo.UserAds(ID))",
                    new
                    {
                        Table = "ScheduledAds",
                        Schema = "dbo"
                    });

                context.Connection.ExecuteIfTableMissing(@"
            CREATE TABLE AdvWebDev.dbo.UserInserts (
                Id UNIQUEIDENTIFIER DEFAULT NEWSEQUENTIALID() PRIMARY KEY,
                PackageInsertId uniqueidentifier NOT NULL,
                UserAdId uniqueidentifier NULL,
                UserId uniqueidentifier NOT NULL,
                CONSTRAINT UserInserts_FK_2 FOREIGN KEY (UserId) REFERENCES AdvWebDev.dbo.Users(ID),
                CONSTRAINT UserInserts_FK FOREIGN KEY (UserAdId) REFERENCES AdvWebDev.dbo.UserAds(ID),
                CONSTRAINT UserInserts_FK_1 FOREIGN KEY (PackageInsertId) REFERENCES AdvWebDev.dbo.PackageInserts(ID)
            );",
                new
                {
                    Table = "UserInserts",
                    Schema = "dbo"
                });

                context.Connection.ExecuteIfTableMissing(@"
                CREATE TABLE AdvWebDev.dbo.PaymentInformation (
                    ID UNIQUEIDENTIFIER DEFAULT NEWSEQUENTIALID() PRIMARY KEY,
                    AddressLine1 varchar(100) NULL,
                    AddressLine2 varchar(100) NULL,
                    City varchar(100) NULL,
                    State varchar(100) NULL,
                    Zip varchar(100) NULL,
                    CreditCardNumber varchar(100) NULL,
                    CreditCardCode varchar(100) NULL,
                    ExpirationDate varchar(100) NULL,
                    FullName varchar(100) NULL)",
                    new
                    {
                        Table = "PaymentInformation",
                        Schema = "dbo"
                    });

                context.Connection.ExecuteIfTableMissing($@"
                CREATE TABLE AdvWebDev.dbo.UserPurchasedPackage (
	                ID UNIQUEIDENTIFIER DEFAULT NEWSEQUENTIALID() PRIMARY KEY,
	                UserId UNIQUEIDENTIFIER NOT NULL,
                    PackageId UNIQUEIDENTIFIER NOT NULL,
                    PurchaseDate datetime2 NOT NULL,
                    PaymentInformationId UNIQUEIDENTIFIER NOT NULL,
                    FOREIGN KEY (UserId) REFERENCES AdvWebDev.dbo.Users(ID),
                    FOREIGN KEY (PackageId) REFERENCES AdvWebDev.dbo.Package(ID),
                    FOREIGN KEY (PaymentInformationId) REFERENCES AdvWebDev.dbo.PaymentInformation(ID))",
                        new
                        {
                            Table = "UserPurchasedPackage",
                            Schema = "dbo"
                        });


                // Seed Data
                SeedDbData(context);

                // Needs to be done last
                transaction.Complete();
            }
        }

        private static void SeedDbData(WebDevDbContext context)
        {
            var packages = new List<PackageModel>
            {
                new PackageModel {
                    Id = Guid.Parse("5dc2ffe6-92f4-472d-96f9-edb3c8aac4e7"),
                    CreatedDate = DateTime.UtcNow,
                    IsColor = true,
                    Price = 52,
                    Invalid = false,
                    TimeLength = 5,
                    Title = "Package Uno",
                    UnitOfTime = "Days",
                    Inserts = new List<PackageInsert> {
                        new PackageInsert {
                            Id = Guid.Parse("dbcd0619-b036-40c6-b317-50fbbbb19811"),
                            PageType = PackageInsert.PageType_HalfPage,
                            PackageId = Guid.Parse("5dc2ffe6-92f4-472d-96f9-edb3c8aac4e7")
                        },
                        new PackageInsert {
                            Id = Guid.Parse("8252b131-9f9b-43cb-9f83-a3b48e9ce416"),
                            PageType = PackageInsert.PageType_QuarterPage,
                            PackageId = Guid.Parse("5dc2ffe6-92f4-472d-96f9-edb3c8aac4e7")
                        }
                    }
                },
                new PackageModel
                {
                    Id = Guid.Parse("3000b0f6-d5ec-4a1f-b251-b2c498ee5183"),
                    CreatedDate = DateTime.UtcNow,
                    IsColor = true,
                    Price = 100,
                    Invalid = false,
                    TimeLength = 1,
                    Title = "Package Dos",
                    UnitOfTime = "Weeks",
                    Inserts = new List<PackageInsert> {
                        new PackageInsert {
                            Id = Guid.Parse("17ffefc9-d684-4762-bbdf-cf55f94ebf4b"),
                            PageType = PackageInsert.PageType_FullPage,
                            PackageId = Guid.Parse("3000b0f6-d5ec-4a1f-b251-b2c498ee5183")
                        },
                    }
                },
                new PackageModel
                {
                    Id = Guid.Parse("35b9c746-6c9b-4da2-8017-62c8f009fc18"),
                    CreatedDate = DateTime.UtcNow,
                    IsColor = true,
                    Price = 200,
                    Invalid = false,
                    TimeLength = 2,
                    Title = "Package Tres",
                    UnitOfTime = "Weeks",
                    Inserts = new List<PackageInsert> {
                        new PackageInsert {
                            Id = Guid.Parse("fcda417f-c7e6-490b-8879-d47c9a6f1423"),
                            PageType = PackageInsert.PageType_FullPage,
                            PackageId = Guid.Parse("35b9c746-6c9b-4da2-8017-62c8f009fc18")
                        },
                        new PackageInsert {
                            Id = Guid.Parse("7e530f17-c559-41fd-9a8c-24383bdacffa"),
                            PageType = PackageInsert.PageType_HalfPage,
                            PackageId = Guid.Parse("35b9c746-6c9b-4da2-8017-62c8f009fc18")
                        },
                        new PackageInsert {
                            Id = Guid.Parse("250e3120-c8de-4562-8215-ef37f9dff84a"),
                            PageType = PackageInsert.PageType_QuarterPage,
                            PackageId = Guid.Parse("35b9c746-6c9b-4da2-8017-62c8f009fc18")
                        }
                    }
                }
            };

            // Insert Packages
            foreach (var package in packages)
            {
                context.Connection.ExecuteIfIdIsMissing(@"
                    INSERT INTO Package (Id, Title, CreatedDate, IsColor, UnitOfTime, TimeLength, Price, Invalid)
                    Values (@Id, @Title, @CreatedDate, @IsColor, @UnitOfTime, @TimeLength, @Price, @Invalid);",
                    new TableParams
                    {
                        TableName = "Package",
                        RecordId = package.Id
                    },
                    package);

                // Insert Package Inserts
                foreach (var packageInsert in package.Inserts)
                {
                    context.Connection.ExecuteIfIdIsMissing(@"
                        INSERT INTO PackageInserts (Id, PackageId, PageType)
                        OUTPUT Inserted.ID
                        Values (@Id, @PackageId, @PageType);",
                        new TableParams
                        {
                            RecordId = packageInsert.Id,
                            TableName = "PackageInserts"
                        },
                        packageInsert);
                }
            }

            context.Connection.ExecuteIfIdIsMissing(@"
                INSERT INTO Users (Id, FirstName, LastName, Email, Password, IsAdmin)
                VALUES (@Id, 'Test', 'Test', 'client', 'client', 0);", tableParams: new TableParams
            {
                RecordId = Guid.Parse("901d0e6a-38a9-40f2-aa34-f2627801c3e2"),
                TableName = "Users"
            },
            new { Id = Guid.Parse("901d0e6a-38a9-40f2-aa34-f2627801c3e2") });

            context.Connection.ExecuteIfIdIsMissing(@"
                INSERT INTO Users (Id, FirstName, LastName, Email, Password, IsAdmin)
                VALUES (@Id, 'Test', 'Test', 'admin', 'admin', 1);", tableParams: new TableParams
            {
                RecordId = Guid.Parse("19413b2e-923f-480f-8d6a-82bc9798e52a"),
                TableName = "Users"
            }, new { Id = Guid.Parse("19413b2e-923f-480f-8d6a-82bc9798e52a") });
        }

        public static int ExecuteIfTableMissing(this IDbConnection cnn, string sql, object param = null, IDbTransaction transaction = null, int? commandTimeout = null, CommandType? commandType = null)
        {
            var props = param.GetType().GetProperties();
            if (!props.Any(x => x.Name == "Table") && !props.Any(x => x.Name == "Schema"))
            {
                throw new System.Exception("When using ExecuteIfTableMissing, you must pass params for 'table' and 'schema'");
            }

            return cnn.Execute($@"
                IF NOT EXISTS (SELECT * 
                FROM INFORMATION_SCHEMA.TABLES 
                WHERE TABLE_Schema = @schema
                AND  TABLE_NAME = @table)
                BEGIN
                    {sql}
                END",
                param);
        }

        public static void ExecuteIfIdIsMissing(this IDbConnection cnn, string sql, TableParams tableParams, object param = null, IDbTransaction transaction = null, int? commandTimeout = null, CommandType? commandType = null)
        {
            var result = cnn.QueryFirstOrDefault<object>($@"SELECT * 
                FROM {tableParams.TableName}
                WHERE Id = @RecordId",
                tableParams);

            if (result == null)
            {
                cnn.Execute(sql, param);
            }
        }
    }

    public class TableParams
    {
        public string TableName { get; set; }
        public Guid RecordId { get; set; }
    }
}
