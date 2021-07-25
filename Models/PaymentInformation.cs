namespace adv_web_dev.Models
{
    public class PaymentInformation
    {
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public string FullName { get; set; }
        public string CreditCardNumber { get; set; }
        public string CreditCardCode { get; set; }
        public string ExpirationDate { get; set; }
    }
}