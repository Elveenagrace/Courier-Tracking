namespace SwiftShip.Models
{
    public class couriers
    {
        public int courierId { get; set; }

        public int userId { get; set; }

        public string pickupAddress { get; set; }

        public string deliveryAddress { get; set; }

        public string pickupPincode { get; set; }

        public string deliveryPincode { get; set; }

        public int weight { get; set; }

        public int height { get; set; }

        public int length { get; set; }

        public int width { get; set; }

        public int price {  get; set; }

        public string itemName { get; set; }

        public string deliveryDate { get; set; }

        public string pickupDate { get; set; }

        public string estimatedDeliveryDate { get; set; }

        

        public string deliveryStatus { get; set; }

        public int PaymentId { get; set; }
    }
}
