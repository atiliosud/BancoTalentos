using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BancoTalentos.Model
{
    public class JsonModel<T>
    {
        public int Code { get; set; }
        public string Message { get; set; }
        public string Message_key { get; set; }
        public T Data { get; set; }

        public JsonModel()
        {

        }
    }
}
