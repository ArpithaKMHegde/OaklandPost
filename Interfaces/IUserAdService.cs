using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using adv_web_dev.Data.Entities;
using adv_web_dev.Data.Models;
using adv_web_dev.Models;

namespace adv_web_dev.Interfaces
{
    public interface IUserAdService
    {
        Task<UserAd> CreateAd(UserAdCreate userAd);
        Task LinkAdFiles(Guid userAdId, List<Guid> fileUploadIds);
        Task<List<UserAd>> GetOpenAds();
        Task<UserAd> GetAd(Guid id);
        ClientViewAdModel GetClientViewAd(Guid id);
        Task CreateUserAdPackage(CreateUserPackageRequest userAd);
        Task<InsertInfo> GetInsertInfo(Guid insertId);
        string GetEmailByUserAdId(Guid userAdId);
    }
}
