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
    public class CidadeController : Controller
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private string BancoTalentosService { get; set; }
        private string CidadesPath { get; set; }

        public CidadeController(IConfiguration configuration, IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
            BancoTalentosService = configuration.GetValue<string>("BancoTalentosServiceUrl");
            CidadesPath = configuration.GetValue<string>("CidadesPath");
        }

        [HttpGet()]
        public async Task<IActionResult> GetAsync([FromQuery] int candidatoId)
        {
            try
            {
                var _httpClient = _httpClientFactory.CreateClient("BancoTalentosService");

                HttpResponseMessage responseMessage = await _httpClient.GetAsync(CidadesPath + Request.QueryString);
                Cidade cidade = null;

                if (responseMessage.IsSuccessStatusCode)
                {
                    cidade = (await responseMessage.Content.ReadAsAsync<JsonModel<Cidade>>()).Data as Cidade;
                }
                else if (responseMessage.StatusCode == HttpStatusCode.Conflict || responseMessage.StatusCode == HttpStatusCode.BadRequest)
                {
                    return BadRequest(responseMessage.Content.ReadAsStringAsync());
                }

                return Ok(cidade);
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
                HttpResponseMessage responseMessage = await httpClient.GetAsync(CidadesPath + "List");

                List<Cidade> cidades = new List<Cidade>();

                if (responseMessage.IsSuccessStatusCode)
                {
                    cidades = (await responseMessage.Content.ReadAsAsync<JsonModel<List<Cidade>>>()).Data as List<Cidade>;
                }
                else if (responseMessage.StatusCode == HttpStatusCode.Unauthorized)
                {
                    return Unauthorized();
                }
                else if (responseMessage.StatusCode == HttpStatusCode.Conflict || responseMessage.StatusCode == HttpStatusCode.BadRequest)
                {
                    return BadRequest(responseMessage.Content.ReadAsStringAsync());
                }

                return Ok(cidades);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
