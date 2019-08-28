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
    public class DisponibilidadeController : Controller
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private string BancoTalentosService { get; set; }
        private string DisponibilidadesPath { get; set; }

        public DisponibilidadeController(IConfiguration configuration, IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
            BancoTalentosService = configuration.GetValue<string>("BancoTalentosServiceUrl");
            DisponibilidadesPath = configuration.GetValue<string>("DisponibilidadesPath");
        }

        [HttpGet()]
        public async Task<IActionResult> GetAsync([FromQuery] int candidatoId)
        {
            try
            {
                var _httpClient = _httpClientFactory.CreateClient("BancoTalentosService");

                HttpResponseMessage responseMessage = await _httpClient.GetAsync(DisponibilidadesPath + Request.QueryString);
                Disponibilidade Disponibilidade = null;

                if (responseMessage.IsSuccessStatusCode)
                {
                    Disponibilidade = (await responseMessage.Content.ReadAsAsync<JsonModel<Disponibilidade>>()).Data as Disponibilidade;
                }
                else if (responseMessage.StatusCode == HttpStatusCode.Conflict || responseMessage.StatusCode == HttpStatusCode.BadRequest)
                {
                    return BadRequest(responseMessage.Content.ReadAsStringAsync());
                }

                return Ok(Disponibilidade);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [Route("List")]
        public async Task<IActionResult> GetToListAsync()
        {
            try
            {
                var httpClient = _httpClientFactory.CreateClient("BancoTalentosService");
                HttpResponseMessage responseMessage = await httpClient.GetAsync(DisponibilidadesPath + "List");

                List<Disponibilidade> Disponibilidades = new List<Disponibilidade>();

                if (responseMessage.IsSuccessStatusCode)
                {
                    Disponibilidades = (await responseMessage.Content.ReadAsAsync<JsonModel<List<Disponibilidade>>>()).Data as List<Disponibilidade>;
                }
                else if (responseMessage.StatusCode == HttpStatusCode.Unauthorized)
                {
                    return Unauthorized();
                }
                else if (responseMessage.StatusCode == HttpStatusCode.Conflict || responseMessage.StatusCode == HttpStatusCode.BadRequest)
                {
                    return BadRequest(responseMessage.Content.ReadAsStringAsync());
                }

                return Ok(Disponibilidades);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
