using System;
using adv_web_dev.Models;

namespace adv_web_dev.Interfaces
{
    public interface IPackageListService
    {
        void SubmitPackage(PackageModel packageInfo);
        PackageListResponse DownloadPackages();
        void InvalidatePackage(string packageId);
        PackageModel GetPackage(Guid id);
    }
}
