using adv_web_dev.Data.Entities;
using adv_web_dev.Models;

namespace adv_web_dev.Data.Models
{
    public class ClientViewAdModel
    {
        public UserAd UserAd { get; set; }
        public string PageType { get; set; }
        public PackageModel Package { get; set; }
    }
}
