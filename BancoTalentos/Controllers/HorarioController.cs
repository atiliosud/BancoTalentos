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
    public class HorarioController : Controller
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private string BancoTalentosService { get; set; }
        private string HorariosPath { get; set; }

        public HorarioController(IConfiguration configuration, IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
            BancoTalentosService = configuration.GetValue<string>("BancoTalentosServiceUrl");
            HorariosPath = configuration.GetValue<string>("HorariosPath");
        }

        [HttpGet()]
        public async Task<IActionResult> GetAsync([FromQuery] int candidatoId)
        {
            try
            {
                var _httpClient = _httpClientFactory.CreateClient("BancoTalentosService");

                HttpResponseMessage responseMessage = await _httpClient.GetAsync(HorariosPath + Request.QueryString);
                Horario Horario = null;

                if (responseMessage.IsSuccessStatusCode)
                {
                    Horario = (await responseMessage.Content.ReadAsAsync<JsonModel<Horario>>()).Data as Horario;
                }
                else if (responseMessage.StatusCode == HttpStatusCode.Conflict || responseMessage.StatusCode == HttpStatusCode.BadRequest)
                {
                    return BadRequest(responseMessage.Content.ReadAsStringAsync());
                }

                return Ok(Horario);
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
                HttpResponseMessage responseMessage = await httpClient.GetAsync(HorariosPath + "List");

                List<Horario> Horarios = new List<Horario>();

                if (responseMessage.IsSuccessStatusCode)
                {
                    Horarios = (await responseMessage.Content.ReadAsAsync<JsonModel<List<Horario>>>()).Data as List<Horario>;
                }
                else if (responseMessage.StatusCode == HttpStatusCode.Unauthorized)
                {
                    return Unauthorized();
                }
                else if (responseMessage.StatusCode == HttpStatusCode.Conflict || responseMessage.StatusCode == HttpStatusCode.BadRequest)
                {
                    return BadRequest(responseMessage.Content.ReadAsStringAsync());
                }

                return Ok(Horarios);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
