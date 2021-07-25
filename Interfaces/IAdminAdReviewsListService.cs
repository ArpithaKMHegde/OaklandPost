using System.Collections.Generic;
using adv_web_dev.Models;

namespace adv_web_dev.Interfaces
{
    public interface IAdminAdReviewsListService
    {
        List<AdminAdReviewsListModel> GetOpenAdListsData(); 
        List<AdminAdReviewsListModel> GetConfirmedAdListsData();
        List<AdminAdReviewsListModel> GetDeniedAdListsData() ;
    }
}
