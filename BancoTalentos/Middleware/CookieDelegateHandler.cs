using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace BancoTalentos.Middleware
{
    public class CookieDelegateHandler : DelegatingHandler
    {
        private readonly IHttpContextAccessor httpContextAccessor;
        private IRequestCookieCollection cookies => httpContextAccessor.HttpContext.Request.Cookies;

        public CookieDelegateHandler(IHttpContextAccessor httpContextAccessor)
        {
            this.httpContextAccessor = httpContextAccessor;
        }

        protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            if (cookies != null && cookies.ContainsKey("atu") && !request.Headers.Contains("Authorization"))
                request.Headers.Add("Authorization", cookies["atu"]);

            return await base.SendAsync(request, cancellationToken);
        }
    }
}
