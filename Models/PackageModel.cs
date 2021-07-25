using System;
using System.Collections.Generic;

namespace adv_web_dev.Models
{
    public class PackageModel
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool IsColor { get; set; }
        public int TimeLength { get; set; }
        public float Price { get; set; }
        public string UnitOfTime { get; set; }
        public List<PackageInsert> Inserts { get; set; }
        public bool Invalid { get; set; }
    }
}
