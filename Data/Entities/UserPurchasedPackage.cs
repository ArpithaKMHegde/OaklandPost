using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace adv_web_dev.Data.Entities
{
    public class UserPurchasedPackage
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }

        public Guid PackageId { get; set; }

        public Guid PaymentInformationId { get; set; }

        public DateTime PurchaseDate { get; set; }
    }
}