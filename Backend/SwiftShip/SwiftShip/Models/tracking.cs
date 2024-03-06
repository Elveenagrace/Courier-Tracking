namespace SwiftShip.Models
{
    public class tracking
    {
        public int courierId { get; set; }

        public int userId { get; set; }

        public string courierHandlerName {  get; set; }

        public string contactInfo {  get; set; }

        public string vehicleName {  get; set; }

        public string vehicleNumber {  get; set; }

        public string pickupAddress { get; set; }

        public string deliveryAddress { get; set; }

        public string pickupPincode { get; set; }

        public string deliveryPincode { get; set; }

        public int weight { get; set; }

        public int height { get; set; }

        public int length { get; set; }

        public int width { get; set; }

        public int price { get; set; }

        public string itemName { get; set; }

        public string deliveryDate { get; set; }

        public string pickupDate { get; set;}


        public string estimatedDeliveryDate { get; set; }

        public string currentPlace { get; set; }

        public string deliveryStatus { get; set; }

        public int PaymentId { get; set; }

        public string transitPincode {  get; set; }
    }
}
