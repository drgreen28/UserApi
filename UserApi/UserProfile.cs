using AutoMapper;

namespace UserApi
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<Models.UserModel, UserDb.Entities.User>().ReverseMap();
        }
    }
}
