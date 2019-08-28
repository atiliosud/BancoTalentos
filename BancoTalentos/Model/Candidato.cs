using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BancoTalentos.Model
{
    public class Candidato
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string UltimoNome { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime DataCriacao { get; set; }
        public string Skype { get; set; }
        public string Telefone { get; set; }
        public Cidade Cidade { get; set; }
        public string Portfolio { get; set; }
        public decimal Pretensao { get; set; }
        public List<DisponibilidadeCandidato> Disponibilidades { get; set; }
        public List<HorarioCandidato> Horarios { get; set; }
    }
}
