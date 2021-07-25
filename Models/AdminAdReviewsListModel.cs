using System;

namespace adv_web_dev.Models
{
    public class AdminAdReviewsListModel
    {
        public Guid ID { get; set; }
        public DateTime SubmittedDate { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime ReviewedDate { get; set; }
        public string Location { get; set; }
        public Guid PackageInsertId { get; set; }
        public string PageType { get; set; }
        public string Title { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
