import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inscricao } from '../../models/Inscricao';

@Injectable({
  providedIn: 'root',
})
export class InscricaoService {
  constructor(private http: HttpClient) { }

  // SALVAR A INSCRIÇÃO
  salvarInscricao(inscricao: Inscricao): Observable<Inscricao> {
    const urlApi = `https://6a7f6d923183f5fd884b1a61.mockapi.io/esportearlivre/inscricao`
    return this.http.post<Inscricao>(urlApi, inscricao);
  }

  // LISTAR TODAS AS INSCRIÇÕES
  listarInscricoes(): Observable<Inscricao[]> {
    const urlApi = `https://6a7f6d923183f5fd884b1a61.mockapi.io/esportearlivre/inscricao`
    return this.http.get<Inscricao[]>(urlApi);
  }

  // EXCLUIR UMA INSCRIÇÃO (Cancelar participação)
  excluirInscricao(idInscricao: number): Observable<Inscricao> {
    const urlApi = `https://6a7f6d923183f5fd884b1a61.mockapi.io/esportearlivre/inscricao/${idInscricao}`
    return this.http.delete<Inscricao>(urlApi);
  }
}