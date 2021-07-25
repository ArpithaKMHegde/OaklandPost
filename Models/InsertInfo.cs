using System;

namespace adv_web_dev.Models
{
    public class InsertInfo
    {
        public PackageInsert Insert { get; set; }
        public PackageModel Package { get; set; }
        public Guid UserInsertId { get; set; }
    }
}