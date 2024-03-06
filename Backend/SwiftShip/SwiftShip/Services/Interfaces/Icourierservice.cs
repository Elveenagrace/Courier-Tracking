using Microsoft.AspNetCore.Mvc;
using SwiftShip.Models;

namespace SwiftShip.Services;

public interface Icourierservice
{
    public int addUserDetails(users userInfo);

    public Task<users> updateUserDetails(int userId,  users userInfo);

    public users getUserDetails(int userId);

    public List<users> getAllUserDetails();


    public int addCourierDetails(addcourier courierInfo);

    public List<couriers> getCourierDetails();

    public couriers getCourierDetails(int courierId);

    public List<paymentdetails> getPaymentDetails();

    public paymentdetails getPaymentDetails(int PaymentId);
    public Task<userlogin> validate(int userId,string username, string password);

    public Task<admin> validateAdmin(string username, string password);

    public int getPrice(int courierId);
    

}
