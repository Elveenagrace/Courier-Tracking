using SwiftShip.Models;
using SwiftShip.Repository;
using SwiftShip.Repository.Interfaces;

namespace SwiftShip.Services
{
    public class courierservice : Icourierservice
    {

        private readonly Icourier _icourier;

        public courierservice(Icourier courierservice)
        {

            _icourier = courierservice;
                    }
        public int addUserDetails(users userInfo)
        {
            return _icourier.addUserDetails(userInfo);  
        }
        public Task<users> updateUserDetails(int userId, users userInfo)
        {
            return _icourier.updateUserDetails(userId,userInfo);
        }



        public int addCourierDetails(addcourier courierInfo)
        {
            return _icourier.addCourierDetails(courierInfo);
        }
        public List<couriers> getCourierDetails()
        {
            return _icourier.getCourierDetails();
        }
        public List<users> getAllUserDetails()
        {
            return _icourier.getAllUserDetails();
        }
        public couriers getCourierDetails(int courierId)
        {
            return _icourier.getCourierDetails(courierId);
        }

        public List<paymentdetails> getPaymentDetails() {
            return _icourier.getPaymentDetails();
                }

        public paymentdetails getPaymentDetails(int PaymentId)
        {
            return _icourier.getPaymentDetails(PaymentId);
        }

        public Task<userlogin> validate(int userId,string username, string password)
        {
            return _icourier.validate(userId,username, password);
        }
        public Task<admin> validateAdmin(string username, string password)
        {
            return _icourier.validateAdmin(username, password);
        }

        public users getUserDetails(int userId)
        {
            return _icourier.getUserDetails(userId);
        }
        public int getPrice(int courierId)
        {
            return _icourier.getPrice(courierId);
        }
    }
}
