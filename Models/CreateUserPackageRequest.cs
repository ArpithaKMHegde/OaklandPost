using System;
using System.Collections.Generic;
using adv_web_dev.Data.Entities;

namespace adv_web_dev.Models
{
    public class CreateUserPackageRequest
    {
        public Guid PackageId { get; set; }
        public List<UserAdUpload> Ads { get; set; }
        public PaymentInformation PaymentInformation { get; set; }
        public Guid UserId { get; set; }
    }
}