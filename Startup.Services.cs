using Microsoft.Extensions.DependencyInjection;
using adv_web_dev.Interfaces;
using adv_web_dev.Services;

namespace adv_web_dev
{
    public partial class Startup
    {
        private IServiceCollection AddCustomServices(IServiceCollection services)
        {
            services.AddScoped<ITestService, TestService>();
            services.AddScoped<IAdFileManagementService, AdFileManagementService>();
            services.AddScoped<IUserAdService, UserAdService>();
            services.AddScoped<IAdminAdReviewsListService, AdminAdReviewsListService>();
            services.AddScoped<IUserRegistrationService, UserRegistrationService>();
            services.AddScoped<IMyAdsService, MyAdsService>();
            services.AddScoped<ILoginService, LoginService>();
            services.AddScoped<IReviewAdService, ReviewAdService>();
            services.AddScoped<IPackageListService, PackageListService>();
            services.AddScoped<IUserInfoService, UserInfoService>();

            return services;
        }
    }
}
