using adv_web_dev.Data.Entities;
using adv_web_dev.Models;

namespace adv_web_dev.Interfaces
{
    public interface IReviewAdService
    {
        ReviewAdResponse ReviewAd (ReviewedAd adId);
    }
}
