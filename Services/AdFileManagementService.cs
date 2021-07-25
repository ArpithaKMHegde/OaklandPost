using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using adv_web_dev.Data;
using adv_web_dev.Models;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using adv_web_dev.Interfaces;
using System.IO;
using Microsoft.AspNetCore.Http;
using adv_web_dev.Extensions;
using adv_web_dev.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace adv_web_dev.Services
{
    public class AdFileManagementService : IAdFileManagementService
    {
        public static string FileManagementLocation = "ad-upload-files/";

        private readonly WebDevDbContext _context;

        public AdFileManagementService(WebDevDbContext context)
        {
            _context = context;
        }

        public async Task<UserFileUpload> SaveFileAsync(IFormFile formFile)
        {
            var directoryName = Path.GetRandomFileName().Replace(".", "");
            var directory = Path.Combine(Environment.CurrentDirectory, FileManagementLocation, directoryName);
            var filePath = Path.Combine(directory, formFile.FileName);
            Directory.CreateDirectory(directory);
            using (var stream = System.IO.File.Create(filePath))
            {
                await formFile.CopyToAsync(stream);
            }

            var id = _context.Connection.ExecuteScalar<Guid>(@"INSERT INTO UserFileUploads(StorageFileName, OriginalFileName)
                OUTPUT Inserted.ID
                VALUES(@StorageFileName, @OriginalFileName)",
                new
                {
                    StorageFileName = directoryName,
                    OriginalFileName = formFile.FileName
                });

            return new UserFileUpload
            {
                Id = id,
                OriginalFileName = directoryName,
                StorageFileName = formFile.FileName
            };
        }

        public Task<AdFileDownload> DownloadFile(Guid fileId)
        {
            var file = _context.Connection.QuerySingle<UserFileUpload>(@"
                SELECT * FROM UserFileUploads ufu  
                LEFT JOIN AdFileUploads afu on ufu.ID = afu.UserFileUploadId
                WHERE afu.ID = @fileId", new { fileId });

            var directory = Path.Combine(Environment.CurrentDirectory, FileManagementLocation, file.StorageFileName);
            var filePath = Path.Combine(directory, file.OriginalFileName);

            return Task.FromResult(new AdFileDownload
            {
                Stream = File.OpenRead(filePath),
                FileName = file.OriginalFileName
            });
        }
    }
}