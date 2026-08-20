import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Corrida } from '../../models/Corrida';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CorridaService {
  constructor(private http: HttpClient) { }

  //SALVAR A CORRIDA
  salvarCorrida(corrida: Corrida) {
    const urlAPi = `https://6a7f6d923183f5fd884b1a61.mockapi.io/esportearlivre/corrida`

    this.http.post<Corrida>(urlAPi, corrida)
      .subscribe({
        next: (respostaAPI) => {
          return respostaAPI
        },
        error: (msgErro) => {
          return msgErro
        }
      })
  }

  //LISTAR TODAS AS CORRIDAS
  listarCorridas(): Observable<Corrida[]> {
    const urlAPi = `https://6a7f6d923183f5fd884b1a61.mockapi.io/esportearlivre/corrida`

    return this.http.get<Corrida[]>(urlAPi)

  }

  //LISTAR UMA CORRIDA
  listarCorrida(idCorrida: Number): Observable<Corrida> {
    const urlAPi = `https://6a7f6d923183f5fd884b1a61.mockapi.io/esportearlivre/corrida/${idCorrida}`

    return this.http.get<Corrida>(urlAPi)

  }

  //EXCLUIR UMA CORRIDA
  excluirCorrida(idCorrida: Number) {
    const urlAPi = `https://6a7f6d923183f5fd884b1a61.mockapi.io/esportearlivre/corrida/${idCorrida}`

    return this.http.delete<Corrida>(urlAPi)
      
  }

  //ALTERAR CORRIDA
  alterarCorrida(corrida: Corrida) {
    const urlAPi = `https://6a7f6d923183f5fd884b1a61.mockapi.io/esportearlivre/corrida/${corrida.id}`

    this.http.put<Corrida>(urlAPi, corrida)
      .subscribe({
        next: (repostaAPI) => {
          return repostaAPI
        },
        error: (msgErro) => {
          return msgErro
        }
      })
  }

}
