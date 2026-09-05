import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Corrida } from '../../../models/Corrida';
import { CorridaService } from '../../../service/corrida/corrida-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-corrida-component',
  imports: [FormsModule],
  templateUrl: './corrida-component.html',
  styleUrl: './corrida-component.css',
})
export class CorridaComponent implements OnInit {
  // ATRIBUTOS (Nomes corrigidos com underline para bater com o banco de dados)
  id = 0
  descricao_corrida = ''
  data_corrida = ''
  distancia_5km = false
  distancia_10km = false
  distancia_25km = false

  idCorrida = 0
  editar = false

  constructor(
    private corridaService: CorridaService,
    private activeRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.idCorrida = Number(this.activeRoute.snapshot.paramMap.get('id'))

    if (this.idCorrida > 0) {
      this.editar = true
      this.carregaDados(this.idCorrida)
    }
  }

  dadosFormulario() {
    const corrida = new Corrida()
    corrida.descricao_corrida = this.descricao_corrida
    corrida.data_corrida = this.data_corrida
    
    // Repassando com os nomes corrigidos
    corrida.distancia_5km = this.distancia_5km
    corrida.distancia_10km = this.distancia_10km
    corrida.distancia_25km = this.distancia_25km

    if (this.editar) {
      corrida.id = this.idCorrida
      
      this.corridaService.alterarCorrida(corrida)
        .subscribe({
          next: (respostaAPI) => {
            console.log("Alterado com sucesso:", respostaAPI)
          },
          error: (msgErro) => {
            console.error("Erro ao alterar:", msgErro)
          }
        })

    } else {
      this.corridaService.salvarCorrida(corrida)
        .subscribe({
          next: (respostaAPI) => {
            console.log("Salvo com sucesso:", respostaAPI)
          },
          error: (msgErro) => {
            console.error("Erro ao salvar:", msgErro)
          }
        })
    }

    this.limparAtributos()
  }

  carregaDados(idCorrida: number) {
    this.corridaService.listarCorrida(idCorrida)
      .subscribe({
        next: (dadosCorrida) => {
          this.descricao_corrida = dadosCorrida.descricao_corrida
          this.data_corrida = dadosCorrida.data_corrida
          
          // Mapeando os nomes corrigidos
          this.distancia_5km = dadosCorrida.distancia_5km
          this.distancia_10km = dadosCorrida.distancia_10km
          this.distancia_25km = dadosCorrida.distancia_25km

          this.cdr.detectChanges()
        },
        error: (msgErro) => {
          console.error("Erro ao carregar dados:", msgErro)
        }
      })
  }

  limparAtributos() {
    this.descricao_corrida = ''
    this.data_corrida = ''
    this.distancia_5km = false
    this.distancia_10km = false
    this.distancia_25km = false
  }
}