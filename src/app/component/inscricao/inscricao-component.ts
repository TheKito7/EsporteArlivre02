import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Atleta } from '../../models/Atleta';
import { Corrida } from '../../models/Corrida';
import { Inscricao } from '../../models/Inscricao';
import { AtletaService } from '../../service/atleta-service';
import { CorridaService } from '../../service/corrida/corrida-service';
import { InscricaoService } from '../../service/inscricao/inscricao-service';

@Component({
  selector: 'app-inscricao',
  standalone: true, //
  imports: [FormsModule , CommonModule],
  templateUrl: './inscricao-component.html',
  styleUrls: ['./inscricao-component.css']
})
export class InscricaoComponent implements OnInit {
  
  // Listas para preencher os <select> no HTML
  atletas: Atleta[] = [];
  corridas: Corrida[] = [];
  
  // Objeto que faz o binding (ngModel) com o formulário
  novaInscricao: Inscricao = new Inscricao();

  // Variável que controla se estamos cadastrando (false) ou alterando (true)
  editar: boolean = false;

  constructor(
    private atletaService: AtletaService,
    private corridaService: CorridaService,
    private inscricaoService: InscricaoService
  ) {}

  ngOnInit(): void {
    // Ao iniciar a tela, carrega as opções de atletas e corridas
    this.carregarAtletas();
    this.carregarCorridas();
  }

  carregarAtletas() {
    this.atletaService.listarAtletas().subscribe(dados => {
      this.atletas = dados;
    });
  }

  carregarCorridas() {
    this.corridaService.listarCorridas().subscribe(dados => {
      this.corridas = dados;
    });
  }

  // Método principal chamado ao dar (submit) no form
 // Método principal chamado ao dar (submit) no form
 dadosFormulario() {
    if (this.editar) {
      alert('Função de alteração em desenvolvimento!');
    } else {
      
      // 1. Criamos uma cópia dos dados para não bagunçar a tela
      let dadosParaSalvar = { ...this.novaInscricao };
      
      // 2. Removemos o ID zerado para que a MockAPI crie um novo automaticamente
      delete (dadosParaSalvar as any).id; 
      
      // 3. Forçamos a conversão dos IDs selecionados no HTML para Número
      dadosParaSalvar.idAtleta = Number(this.novaInscricao.idAtleta);
      dadosParaSalvar.idCorrida = Number(this.novaInscricao.idCorrida);

      // 4. Enviamos os dados limpos para o serviço
      this.inscricaoService.salvarInscricao(dadosParaSalvar as Inscricao).subscribe({
        next: () => {
          alert('Inscrição cadastrada com sucesso!');
          this.limparFormulario();
        },
        error: (erro) => {
          console.error('Erro detalhado:', erro);
          alert('Erro ao salvar! Verifique se o nome do endpoint na MockAPI é exatamente /inscricao');
        }
      });
    }
  }

  // Método auxiliar para resetar a tela após salvar ou cancelar
  limparFormulario() {
    this.novaInscricao = new Inscricao(); // Reseta os dados
    this.editar = false; // Volta o botão e o título para "Cadastrar"
  }
}