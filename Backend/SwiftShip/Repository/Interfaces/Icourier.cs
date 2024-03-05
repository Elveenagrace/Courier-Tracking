using Microsoft.AspNetCore.Mvc;
using SwiftShip.Models;

namespace SwiftShip.Repository.Interfaces
{
    public interface Icourier 
    {
        public int addUserDetails(users userInfo);
       
        public users getUserDetails(int userId);



        public int addCourierDetails(addcourier courierInfo);

        public List<couriers> getCourierDetails();

        public couriers getCourierDetails(int courierId);

        public List<paymentdetails> getPaymentDetails();

        public paymentdetails getPaymentDetails(int PaymentId);
        Task<userlogin> validate(int userId,string username, string password);


        Task<admin> validateAdmin(string username, string password);

        Task<users> updateUserDetails(int userId, users userInfo);

        public int getPrice(int courierId);

    }
}
