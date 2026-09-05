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
  salvarCorrida(corrida: Corrida):Observable<Corrida> {
    //const urlAPi = `https://6a7f6d923183f5fd884b1a61.mockapi.io/esportearlivre/corrida`
    const urlAPi = 'http://127.0.0.1:8000/corrida/'
    return this.http.post<Corrida>(urlAPi, corrida)
      
  }

  //LISTAR TODAS AS CORRIDAS
  listarCorridas(): Observable<Corrida[]> {
    //const urlAPi = `https://6a7f6d923183f5fd884b1a61.mockapi.io/esportearlivre/corrida`
    const urlAPi = 'http://127.0.0.1:8000/corrida/'
    return this.http.get<Corrida[]>(urlAPi)

  }

  //LISTAR UMA CORRIDA
  listarCorrida(idCorrida: Number): Observable<Corrida> {
    //const urlAPi = `https://6a7f6d923183f5fd884b1a61.mockapi.io/esportearlivre/corrida/${idCorrida}`
    const urlAPi = 'http://127.0.0.1:8000/corrida/'
    return this.http.get<Corrida>(urlAPi)

  }

  //EXCLUIR UMA CORRIDA
  excluirCorrida(idCorrida: Number) {
    //const urlAPi = `https://6a7f6d923183f5fd884b1a61.mockapi.io/esportearlivre/corrida/${idCorrida}`
    const urlAPi = 'http://127.0.0.1:8000/corrida/'
    return this.http.delete<Corrida>(urlAPi)
      
  }

  //ALTERAR CORRIDA
  alterarCorrida(corrida: Corrida): Observable<Corrida> {
    //const urlAPi = `https://6a7f6d923183f5fd884b1a61.mockapi.io/esportearlivre/corrida/${corrida.id}`
    const urlAPi = 'http://127.0.0.1:8000/corrida/'
    return this.http.put<Corrida>(urlAPi, corrida)
      
  }

}
