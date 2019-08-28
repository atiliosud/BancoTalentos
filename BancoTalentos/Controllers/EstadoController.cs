using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using BancoTalentos.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace BancoTalentos.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class EstadoController : Controller
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private string BancoTalentosService { get; set; }
        private string EstadosPath { get; set; }

        public EstadoController(IConfiguration configuration, IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
            BancoTalentosService = configuration.GetValue<string>("BancoTalentosServiceUrl");
            EstadosPath = configuration.GetValue<string>("EstadosPath");
        }

        [Route("List")]
        public async Task<IActionResult> GetToListAsync()
        {
            try
            {
                var httpClient = _httpClientFactory.CreateClient("BancoTalentosService");
                HttpResponseMessage responseMessage = await httpClient.GetAsync(EstadosPath + "List");

                List<Estado> Estados = new List<Estado>();

                if (responseMessage.IsSuccessStatusCode)
                {
                    Estados = (await responseMessage.Content.ReadAsAsync<JsonModel<List<Estado>>>()).Data as List<Estado>;
                }
                else if (responseMessage.StatusCode == HttpStatusCode.Unauthorized)
                {
                    return Unauthorized();
                }
                else if (responseMessage.StatusCode == HttpStatusCode.Conflict || responseMessage.StatusCode == HttpStatusCode.BadRequest)
                {
                    return BadRequest(responseMessage.Content.ReadAsStringAsync());
                }

                return Ok(Estados);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
