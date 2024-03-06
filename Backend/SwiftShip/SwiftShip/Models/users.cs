using System.ComponentModel.DataAnnotations;

namespace SwiftShip.Models
{
    public class users
    {
        public int userId { get; set; }
        public string username {  get; set; }
        public string password { get; set; }    
        public string email { get; set; }
        public string phone { get; set; }
    }
}
