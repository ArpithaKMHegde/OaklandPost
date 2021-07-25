using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using adv_web_dev.Data;
using adv_web_dev.Data.Entities;
using adv_web_dev.Models;
using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace adv_web_dev.Interfaces
{
    public interface IAdFileManagementService
    {
        Task<UserFileUpload> SaveFileAsync(IFormFile formFile);
        Task<AdFileDownload> DownloadFile(Guid fileId);
    }
}