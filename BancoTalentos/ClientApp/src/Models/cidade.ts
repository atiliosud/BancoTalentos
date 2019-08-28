import { Candidato } from "./candidato";


export interface Cidade {
    id: number;
    nome: string;
    estado: any;
    candidato: Candidato;
}
