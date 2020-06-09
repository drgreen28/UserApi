using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserApi.Interfaces;
using UserApi.Models;
using UserDb;
using UserDb.Entities;

namespace UserApi.Services
{
    public class UserService : IUserService
    {
        private readonly UserContext _userContext;
        private readonly IMapper _mapper;

        public UserService(UserContext userContext, IMapper mapper)
        {
            _userContext = userContext;
            _mapper = mapper;
        }

        public ServiceResponse<UserModel> AddUser(UserModel userModel)
        {
            ServiceResponse<UserModel> response = new ServiceResponse<UserModel>();
            try
            {
                userModel.Active = true;
                var user = _mapper.Map<User>(userModel);
                _userContext.Add(user);
                _userContext.SaveChanges();
                userModel.Id = user.Id;
                response.ReturnValue = userModel;
            }
            catch(Exception e)
            {
                response.Message = e.Message;
                response.Success = false;
            }

            response.Message = userModel.FirstName + " has been added!";
            response.Success = true;

            return response;
        }

        public ServiceResponse<string> RemoveUser(int id)
        {
            ServiceResponse<string> response = new ServiceResponse<string>();
            try
            {
                var user = _userContext.Users.Find(id);
                user.Active = false;
                _userContext.Users.Update(user);
                _userContext.SaveChanges();
            }
            catch (Exception e)
            {
                response.Message = e.Message;
                response.Success = false;
            }

            response.Message = "User Id " + id + " has been removed!";
            response.Success = true;

            return response;

        }

        public ServiceResponse<UserModel> GetUser(int id)
        {
            ServiceResponse<UserModel> response = new ServiceResponse<UserModel>();
            
            try
            {
                var user = _userContext.Users.Find(id);
                response.ReturnValue = _mapper.Map<UserModel>(user);
            }
            catch (Exception e)
            {
                response.Message = e.Message;
                response.Success = false;
            }

            response.Success = true;

            return response;
        }

        public ServiceResponse<IEnumerable<UserModel>> GetUsers()
        {
            ServiceResponse<IEnumerable<UserModel>> response = new ServiceResponse<IEnumerable<UserModel>>();

            try
            {
                var users = _userContext.Users.Where(x => x.Active);
                response.ReturnValue = _mapper.Map<IEnumerable<UserModel>>(users.ToList());
            }
            catch (Exception e)
            {
                response.Message = e.Message;
                response.Success = false;
            }

            response.Success = true;

            return response;
        }

        public ServiceResponse<UserModel> UpdateUser(UserModel userModel)
        {
            ServiceResponse<UserModel> response = new ServiceResponse<UserModel>();

            try
            {
                var user = _userContext.Users.Find(userModel.Id);
                _mapper.Map(userModel, user);

                _userContext.SaveChanges();
            }
            catch (Exception e)
            {
                response.Message = e.Message;
                response.Success = false;
            }

            response.ReturnValue = userModel;
            response.Success = true;

            return response;
        }
    }
}
