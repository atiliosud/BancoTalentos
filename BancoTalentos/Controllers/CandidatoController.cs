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
    public class CandidatoController : Controller
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private string BancoTalentosService { get; set; }
        private string CandidatosPath { get; set; }

        public CandidatoController(IConfiguration configuration, IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
            BancoTalentosService = configuration.GetValue<string>("BancoTalentosServiceUrl");
            CandidatosPath = configuration.GetValue<string>("CandidadosPath");
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get([FromQuery]int id)
        {
            try
            {
                var _httpClient = _httpClientFactory.CreateClient("BancoTalentosService");
                HttpResponseMessage responseMessage = await _httpClient.GetAsync(CandidatosPath + id);
                Candidato candidato = null;

                if (responseMessage.IsSuccessStatusCode)
                {
                    candidato = (await responseMessage.Content.ReadAsAsync<JsonModel<Candidato>>()).Data as Candidato;
                }
                else if (responseMessage.StatusCode == HttpStatusCode.Conflict || responseMessage.StatusCode == HttpStatusCode.BadRequest)
                {
                    return BadRequest(responseMessage.Content.ReadAsStringAsync());
                }

                return Ok(candidato);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Candidato candidato)
        {
            try
            {
                var _httpClient = _httpClientFactory.CreateClient("BancoTalentosService");
                HttpResponseMessage responseMessage = await _httpClient.PutAsJsonAsync(CandidatosPath, candidato);

                if (responseMessage.StatusCode == HttpStatusCode.Unauthorized)
                {
                    return Unauthorized();
                }
                else if (responseMessage.StatusCode == HttpStatusCode.Conflict || responseMessage.StatusCode == HttpStatusCode.BadRequest)
                {
                    return Conflict(responseMessage.Content.ReadAsStringAsync());
                }

                return Ok(string.Empty);
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
                HttpResponseMessage responseMessage = await httpClient.GetAsync(CandidatosPath + "List");

                List<Candidato> candidatos = new List<Candidato>();

                if (responseMessage.IsSuccessStatusCode)
                {
                    candidatos = (await responseMessage.Content.ReadAsAsync<JsonModel<List<Candidato>>>()).Data as List<Candidato>;
                }
                else if (responseMessage.StatusCode == HttpStatusCode.Unauthorized)
                {
                    return Unauthorized();
                }
                else if (responseMessage.StatusCode == HttpStatusCode.Conflict || responseMessage.StatusCode == HttpStatusCode.BadRequest)
                {
                    return BadRequest(responseMessage.Content.ReadAsStringAsync());
                }

                return Ok(candidatos);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Candidato candidato)
        {
            try
            {
                var _httpClient = _httpClientFactory.CreateClient("BancoTalentosService");
                HttpResponseMessage responseMessage = await _httpClient.PostAsJsonAsync(CandidatosPath, candidato);

                if (responseMessage.IsSuccessStatusCode)
                {
                    Candidato result = (await responseMessage.Content.ReadAsAsync<JsonModel<Candidato>>()).Data as Candidato;
                    return Ok(result);
                }
                else if (responseMessage.StatusCode == HttpStatusCode.Unauthorized)
                {
                    return Unauthorized();
                }
                else if (responseMessage.StatusCode == HttpStatusCode.Conflict || responseMessage.StatusCode == HttpStatusCode.BadRequest)
                {
                    return BadRequest(responseMessage.Content.ReadAsStringAsync());
                }

                return Ok(string.Empty);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }


    }
}
