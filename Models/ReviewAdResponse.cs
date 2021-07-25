using System;

namespace adv_web_dev.Models
{
    public class ReviewAdResponse
    {
        public Guid AdId {get;set;}
        public string Comments {get;set;}
        public bool Accepted {get;set;}
        public bool Rejected {get;set;}
    }
}