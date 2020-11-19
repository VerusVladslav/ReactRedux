using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibIT.Web.Helpers
{
    public interface IEmailSender
    {
        void SendEmail(Message message);
    }
}
