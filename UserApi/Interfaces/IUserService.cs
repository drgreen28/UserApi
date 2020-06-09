using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserApi.Models;

namespace UserApi.Interfaces
{
    public interface IUserService
    {
        ServiceResponse<UserModel> AddUser(UserModel user);
        ServiceResponse<UserModel> UpdateUser(UserModel user);
        ServiceResponse<IEnumerable<UserModel>> GetUsers();
        ServiceResponse<UserModel> GetUser(int id);
        ServiceResponse<string> RemoveUser(int id);
    }
}
