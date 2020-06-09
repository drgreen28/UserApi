﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UserApi.Models
{
    public partial class ServiceResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public Exception Exception { get; set; }
        public ServiceResponse() { }
        public ServiceResponse(bool success)
        {
            Success = success;
        }
        public ServiceResponse(bool success, string message)
        {
            Success = success;
            Message = message;
        }
    }

    public partial class ServiceResponse<T>
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public T ReturnValue { get; set; }
        public Exception Exception { get; set; }
        public ServiceResponse()
        {

        }
    }
}
