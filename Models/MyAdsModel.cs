using System;

namespace adv_web_dev.Models
{
    public class MyAdsInsertsAvailableModel
    {
        public Guid Id { get; set; } //Id of available insert
        public string PageType { get; set; }
        public string Title { get; set; } //PackageName
    }

    public class MyAdsRunningAdsModel
    {
        public Guid Id { get; set; } //Id of scheduled or completed ad
        public string PageType { get; set; }
        public string Title { get; set; } //PackageName

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public Guid UserAdId { get; set; }
    }
}
