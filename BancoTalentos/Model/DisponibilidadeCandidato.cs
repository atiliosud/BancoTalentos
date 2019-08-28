using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BancoTalentos.Model
{
    public class DisponibilidadeCandidato
    {
        public int DisponibilidadeId { get; set; }
        public Disponibilidade Disponibilidade { get; set; }
        public int CandidatoId { get; set; }
        public Candidato Candidato { get; set; }
    }
}
