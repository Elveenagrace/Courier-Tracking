namespace SwiftShip.Models
{
    public class paymentdetails
    {
        public int courierId { get; set; }

        public int userId { get; set; }

        public int paymentId { get; set; }

        public int AmountPaid { get; set; }

        public string paymentMethod { get; set; }

        public string transactionStatus { get; set; }

        public DateTime paymentTime { get; set; }

    }
}
