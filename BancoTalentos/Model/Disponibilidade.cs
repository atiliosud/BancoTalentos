using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BancoTalentos.Model
{
    public class Disponibilidade
    {
        public int Id { get; set; }
        public string Descricao { get; set; }
        public List<DisponibilidadeCandidato> Disponibilidades { get; set; }
    }
}
