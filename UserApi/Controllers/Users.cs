using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using UserApi.Interfaces;
using UserApi.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace UserApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Users : ControllerBase
    {
        private readonly IUserService _userService;
        public Users(IUserService userService)
        {
            _userService = userService;
        }

        // GET: api/<Users>
        [HttpGet]
        public ServiceResponse<IEnumerable<UserModel>> Get()
        {
            return _userService.GetUsers();
        }

        // GET api/<Users>/5
        [HttpGet("{id}")]
        public ServiceResponse<UserModel> Get(int id)
        {
            return _userService.GetUser(id);
        }

        // POST api/<Users>
        [HttpPost]
        public ServiceResponse<UserModel> Post([FromBody] UserModel userModel)
        {
            return _userService.AddUser(userModel);
        }

        // PUT api/<Users>/5
        [HttpPut("{id}")]
        public ServiceResponse<UserModel> Put(int id, [FromBody] UserModel userModel)
        {
            return _userService.UpdateUser(userModel);
        }

        // DELETE api/<Users>/5
        [HttpDelete("{id}")]
        public ServiceResponse<string> Delete(int id)
        {
            return _userService.RemoveUser(id);
        }
    }
}
