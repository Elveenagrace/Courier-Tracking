using Microsoft.AspNetCore.Mvc;
using SwiftShip.Models;
using SwiftShip.Repository.Interfaces;
using System.Data.SqlClient;
using System.Diagnostics.Metrics;
using System.Numerics;

namespace SwiftShip.Repository

   
{
    public class courier : Icourier
    {
        public string cstr = @"Data Source=APINP-ELPTH7F76\SQLEXPRESS;Initial Catalog=Swift_Ship;User ID=tap2023;Password=tap2023;Encrypt=False";

        public courier() { 
        
        }
        public int addUserDetails(users userInfo)
        {
            string query = "INSERT INTO users (username, password, email, phone) VALUES ( @username, @password, @email, @phone)";

            using (SqlConnection connection = new SqlConnection(cstr))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                   
                    command.Parameters.AddWithValue("@username", userInfo.username);
                    command.Parameters.AddWithValue("@password", userInfo.password);
                    command.Parameters.AddWithValue("@email", userInfo.email);
                    command.Parameters.AddWithValue("@phone", userInfo.phone);

                    return command.ExecuteNonQuery();
                }
            }

        }
        public users getUserDetails(int userId)
        {
            using (SqlConnection connection = new SqlConnection(cstr))
            {
                connection.Open();

                string sqlQuery = @"SELECT userId, username, password, email, phone FROM users WHERE userId = @userId";

                using (SqlCommand command = new SqlCommand(sqlQuery, connection))
                {
                    command.Parameters.AddWithValue("@userId", userId);

                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            users user = new users
                            {
                                userId = reader.GetInt32(reader.GetOrdinal("userId")),
                                username = reader.GetString(reader.GetOrdinal("username")),
                                password = reader.GetString(reader.GetOrdinal("password")),
                                email = reader.GetString(reader.GetOrdinal("email")),
                                phone = reader.GetString(reader.GetOrdinal("phone"))
                            };

                            return user;
                        }
                        else
                        {
                            return null; // No user found with the given userId
                        }
                    }
                }
            }
        }

        private int GenerateRandomUserId()
        {
            Random random = new Random();
            return random.Next(1, 51); // Generates a random number between 1 and 50
        }

        public int addCourierDetails(addcourier courierInfo)
        {
            string query = @"INSERT INTO couriers (pickupAddress, deliveryAddress, pickupPincode, deliveryPincode, weight, height, length, width, itemName, estimatedDeliveryDate)
         VALUES (@pickupAddress, @deliveryAddress, @pickupPincode, @deliveryPincode, @weight, @height, @length, @width, @itemName, @estimatedDeliveryDate)";

            using (SqlConnection connection = new SqlConnection(cstr))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(query, connection))

                {
                    DateTime pickupDate = DateTime.Now;
                    DateTime estimatedDeliveryDate = pickupDate.AddDays(7);


                   
                    command.Parameters.AddWithValue("@pickupAddress", courierInfo.pickupAddress);
                    command.Parameters.AddWithValue("@deliveryAddress", courierInfo.deliveryAddress);
                    command.Parameters.AddWithValue("@pickupPincode", courierInfo.pickupPincode);
                    command.Parameters.AddWithValue("@deliveryPincode", courierInfo.deliveryPincode);
                    command.Parameters.AddWithValue("@weight", courierInfo.weight);
                    command.Parameters.AddWithValue("@height", courierInfo.height);
                    command.Parameters.AddWithValue("@length", courierInfo.length);
                    command.Parameters.AddWithValue("@width", courierInfo.width);
                    command.Parameters.AddWithValue("@itemName", courierInfo.itemName);
                    command.Parameters.AddWithValue("@estimatedDeliveryDate", estimatedDeliveryDate);
                    command.Parameters.AddWithValue("@pickupDate", pickupDate);
                    int randomUserId = GenerateRandomUserId(); // Generate a random user ID
                    command.Parameters.AddWithValue("@userId", randomUserId);









                    int rowsAffected = command.ExecuteNonQuery();

                    if (rowsAffected > 0)
                    {
                        int courierId = GetLastInsertedCourierId(connection);
                        UpdatePrice(courierId,courierInfo, connection);
                        UpdateDeliveryStatus(courierId, connection);

                        return courierId;
                    }
                    else
                    {
                        return 0;
                    }
                }
            }
        }
        

        private int GetLastInsertedCourierId(SqlConnection connection)
        {
            string query = "SELECT MAX(courierId) FROM couriers";

            using (SqlCommand command = new SqlCommand(query, connection))
            {
                int courierId = (int)command.ExecuteScalar();
                return courierId;
            }
        }

        private void UpdatePrice(int courierId, addcourier courierInfo, SqlConnection connection)
        {
            string query = "UPDATE couriers SET price = @price WHERE courierId = @courierId";

            using (SqlCommand command = new SqlCommand(query, connection))
            {
                // Calculate the price based on weight, height, length, width
                int price = courierInfo.weight * courierInfo.height * courierInfo.length * courierInfo.width;

                command.Parameters.AddWithValue("@price", price);
                command.Parameters.AddWithValue("@courierId", courierId);

                command.ExecuteNonQuery();
            }
        }

        private void UpdateDeliveryStatus(int courierId, SqlConnection connection)
        {
            string query = "UPDATE couriers SET deliveryStatus = @deliveryStatus,deliveryDate=@deliveryDate, estimatedDeliveryDate = @estimatedDeliveryDate, pickupDate = @pickupDate,userId = @userId WHERE courierId = @courierId";

            using (SqlCommand command = new SqlCommand(query, connection))
            {
                DateTime pickupDate = DateTime.Now;
                DateTime estimatedDeliveryDate = pickupDate.AddDays(7);
                string deliveryStatus = (estimatedDeliveryDate.CompareTo(DateTime.Now) <= 0) ? "Delivered" : "Pending";
                string deliveryDate = (deliveryStatus == "Delivered") ? DateTime.Now.ToString() : "";
                int randomUserId = GenerateRandomUserId();


                if (estimatedDeliveryDate.CompareTo(DateTime.Now) <= 0)
                    command.Parameters.AddWithValue("@deliveryStatus", "Delivered");
                else
                    command.Parameters.AddWithValue("@deliveryStatus", "Pending");

                command.Parameters.AddWithValue("@estimatedDeliveryDate", estimatedDeliveryDate);
                command.Parameters.AddWithValue("@pickupDate", pickupDate);
                command.Parameters.AddWithValue("@deliveryDate", deliveryDate);
                command.Parameters.AddWithValue("@userId", randomUserId);
                command.Parameters.AddWithValue("@courierId", courierId);

                command.ExecuteNonQuery();
            }
        }


        public List<couriers> getCourierDetails()
        {
            List<couriers> courierList = new List<couriers>();

            using (SqlConnection connection = new SqlConnection(cstr))
            {
                string query = "SELECT courierId, userId, pickupAddress, deliveryAddress, pickupPincode, deliveryPincode, weight, height, length, width, price, itemName, deliveryDate, pickupDate, estimatedDeliveryDate,  deliveryStatus  FROM couriers";

                SqlCommand command = new SqlCommand(query, connection);

                connection.Open();

                SqlDataReader reader = command.ExecuteReader();

                while (reader.Read())
                {
                    couriers courier = new couriers();

                    courier.courierId = Convert.ToInt32(reader["courierId"]);
                    courier.userId = Convert.ToInt32(reader["userId"]);
                    courier.pickupAddress = reader["pickupAddress"].ToString();
                    courier.deliveryAddress = reader["deliveryAddress"].ToString();
                    courier.pickupPincode = reader["pickupPincode"].ToString();
                    courier.deliveryPincode = reader["deliveryPincode"].ToString();
                    courier.weight =  Convert.ToInt32(reader["weight"]);
                    courier.height = Convert.ToInt32(reader["height"].ToString());
                    courier.length = Convert.ToInt32(reader["length"]);
                    courier.width = Convert.ToInt32(reader["width"]);
                    courier.price = Convert.ToInt32(reader["price"]);
                    courier.itemName = reader["itemName"].ToString();
                    courier.deliveryDate = reader["deliveryDate"].ToString();
                    courier.pickupDate = reader["pickupDate"].ToString();
                    courier.estimatedDeliveryDate = reader["estimatedDeliveryDate"].ToString();
                    
                    courier.deliveryStatus = reader["deliveryStatus"].ToString();
                    

                    courierList.Add(courier);
                }

                reader.Close();
            }

            return courierList;

        }

        public couriers getCourierDetails(int courierId)
        {
            couriers courier = null;

            using (SqlConnection connection = new SqlConnection(cstr))
            {
                string query = "SELECT * FROM couriers WHERE courierId = @CourierId";

                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@CourierId", courierId);

                try
                {
                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();

                    if (reader.Read())
                    {
                        courier = new couriers();
                        courier.courierId = Convert.ToInt32(reader["courierId"]);
                        courier.userId = Convert.ToInt32(reader["userId"]);
                        courier.pickupAddress = reader["pickupAddress"].ToString();
                        courier.deliveryAddress = reader["deliveryAddress"].ToString();
                        courier.pickupPincode = reader["pickupPincode"].ToString();
                        courier.deliveryPincode = reader["deliveryPincode"].ToString();
                        courier.weight = Convert.ToInt32(reader["weight"]);
                        courier.height = Convert.ToInt32(reader["height"].ToString());
                        courier.length = Convert.ToInt32(reader["length"]);
                        courier.width = Convert.ToInt32(reader["width"]);
                        courier.price = Convert.ToInt32(reader["price"]);
                        courier.itemName = reader["itemName"].ToString();
                        courier.deliveryDate = reader["deliveryDate"].ToString();
                        courier.pickupDate = reader["pickupDate"].ToString();
                        courier.estimatedDeliveryDate = reader["estimatedDeliveryDate"].ToString();
                        
                        courier.deliveryStatus = reader["deliveryStatus"].ToString();
                       
                        
                    }

                    reader.Close();
                }
                catch (Exception ex)
                {
                   
                    Console.WriteLine($"Error: {ex.Message}");
                }
            }

            return courier;


        }
        

        public List<paymentdetails> getPaymentDetails()
        {  //do you know nile red "those eyes "
            
            throw new NotImplementedException();
        }

        public paymentdetails getPaymentDetails(int PaymentId)
        {
            throw new NotImplementedException();
        }

        public Task<userlogin> validate(int userId, string username, string password)
        {


            string query = "SELECT userId, password FROM users WHERE username = @Username";
            using (SqlConnection connection = new SqlConnection(cstr))
            {
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    // Set the parameter value
                    command.Parameters.AddWithValue("@Username", username);

                    connection.Open();
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            int userId2 = reader.GetInt32(0); // Retrieve the userId from the first column (index 0)
                            string storedPassword = reader.GetString(1); // Retrieve the password from the second column (index 1)
                            if (password == storedPassword)
                            {
                                // Passwords match, return the user
                                userlogin user = new userlogin();
                                user.userId = userId2;
                                user.username = username;
                                user.password = password;

                                return Task.FromResult(user);
                            }
                        }
                    }
                }
            }


            // User not found or password doesn't match, return null
            return Task.FromResult((userlogin)null);
        }
        public Task<admin> validateAdmin(string username, string password)
        {

            string query = "SELECT password FROM AdminDetails WHERE username = @Username";
            using (SqlConnection connection = new SqlConnection(cstr))
            {
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    // Set the parameter value
                    command.Parameters.AddWithValue("@Username", username);

                    connection.Open();
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            string storedPassword = reader.GetString(0);
                            if (password == storedPassword)
                            {
                                // Passwords match, return the user
                                admin user = new admin();
                                user.username = username;
                                user.password = password;

                                return Task.FromResult(user);
                            }
                        }
                    }
                }
            }

            // User not found or password doesn't match, return null
            return Task.FromResult((admin)null);
        }

        public async Task<users> updateUserDetails(int userId, [FromBody] users userInfo)
        {
            using (SqlConnection connection = new SqlConnection(cstr))
            {
                await connection.OpenAsync();

                using (SqlCommand updateCommand = new SqlCommand(@"
            UPDATE users SET username = @username, password = @password, email = @email, phone = @phone WHERE userId = @userId;
            SELECT * FROM users WHERE userId = @userId;", connection))
                {
                    updateCommand.Parameters.AddWithValue("@userId", userInfo.userId);
                    updateCommand.Parameters.AddWithValue("@username", userInfo.username);
                    updateCommand.Parameters.AddWithValue("@password", userInfo.password); // Consider hashing the password before saving
                    updateCommand.Parameters.AddWithValue("@email", userInfo.email);
                    updateCommand.Parameters.AddWithValue("@phone", userInfo.phone);

                    // Execute the update command
                    await updateCommand.ExecuteNonQueryAsync();

                    // Execute the select command to retrieve the updated user
                    using (SqlDataReader reader = await updateCommand.ExecuteReaderAsync())
                    {
                        if (reader.Read())
                        {
                            return new users
                            {
                                userId = (int)reader["userId"],
                                username = (string)reader["username"],
                                password = (string)reader["password"], // Consider handling password securely
                                email = (string)reader["email"],
                                phone = (string)reader["phone"]
                            };
                        }
                    }
                }
            }

            return null; // Return null or throw an exception if no user is found
        }
        public int getPrice(int courierId)
        {
            {
                using (SqlConnection connection = new SqlConnection(cstr))
                {
                    connection.Open();

                    using (SqlCommand command = new SqlCommand(@"
                SELECT price FROM couriers WHERE courierId = @courierId;", connection))
                    {
                        command.Parameters.AddWithValue("@courierId", courierId);

                        // Execute the select command to retrieve the price
                        int price = 0;
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                price = reader.GetInt32(0); // Assuming the price is the first column in the result set
                            }
                        }

                        return price;
                    }
                }
            }

        }


    }
}
