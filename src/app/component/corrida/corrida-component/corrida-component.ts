import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Corrida } from '../../../models/Corrida';
import { CorridaService } from '../../../service/corrida/corrida-service';

@Component({
  selector: 'app-corrida-component',
  imports: [FormsModule],
  templateUrl: './corrida-component.html',
  styleUrl: './corrida-component.css',
})
export class CorridaComponent {
  //DEFININDO OS ATRIBUTOS DO COMPONENTE CorridaComponent
  id = 0
  descricao_corrida = ''
  data_corrida = ''
  distancia5km = false
  distancia10km = false
  distancia25km = false

  constructor(private corridaService: CorridaService) { }

  //FUNÇÃO PARA CADASTRAR E ALTERAR
  dadosFormulario() {
    const corrida = new Corrida()
    corrida.descricao_corrida = this.descricao_corrida
    corrida.data_corrida = this.data_corrida
    corrida.distancia5km = this.distancia5km
    corrida.distancia10km = this.distancia10km
    corrida.distancia25km = this.distancia25km

    this.corridaService.salvarCorrida(corrida)

    this.limparAtributos()

  }

  //LIMPAR OS ATRIBUTOS
  limparAtributos() {
    this.descricao_corrida = ''
    this.data_corrida = ''
    this.distancia5km = false
    this.distancia10km = false
    this.distancia25km = false
  }

}
