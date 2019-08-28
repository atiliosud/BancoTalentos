using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BancoTalentos.Model
{
    public class HorarioCandidato
    {
        public int HorarioId { get; set; }
        public Horario Horario { get; set; }
        public int CandidatoId { get; set; }
        public Candidato Candidato { get; set; }
    }
}
