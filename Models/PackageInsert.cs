using System;
using Newtonsoft.Json;

namespace adv_web_dev.Models
{
    public class PackageInsert
    {
        public static string PageType_FullPage = "Full-Page";
        public static string PageType_HalfPage = "Half-Page";
        public static string PageType_QuarterPage = "Quarter-Page";
        public static string PageType_EighthPage = "Eighth-Page";


        public Guid Id { get; set; }
        public string PageType { get; set; }

        [JsonIgnore]
        public Guid PackageId { get; set; }
    }
}
