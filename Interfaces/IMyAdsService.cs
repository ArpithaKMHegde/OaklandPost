using System;
using System.Collections.Generic;
using adv_web_dev.Models;

namespace adv_web_dev.Interfaces
{
    public interface IMyAdsService
    {
        List<MyAdsInsertsAvailableModel> GetAvailableInserts(Guid userId);
        List<MyAdsRunningAdsModel> GetAdsToBeReviewed(Guid userId);
        List<MyAdsRunningAdsModel> GetRunningAds(Guid userId);
        List<MyAdsRunningAdsModel> GetCompletedAds(Guid userId);
    }
}