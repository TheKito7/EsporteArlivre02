import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AtletaService } from '../../service/atleta-service';
import { Atleta } from '../../models/Atleta';

@Component({
  selector: 'app-atleta-component',
  imports: [FormsModule],
  templateUrl: './atleta-component.html',
  styleUrl: './atleta-component.css',
})
export class AtletaComponent {
  //DELCARAÇÃO DOS ATRIBUTOS DO COMPONENTE
  nome = ''
  cpf = 0
  sexo = ''
  cep = 0
  ruaLogradouro = ''
  bairro = ''
  cidade = ''
  uf = ''

  //DECLARAÇÃO DO CONSTRUTOR  
  constructor(private atletaService: AtletaService) { }

  //DECLARAÇÃO DE FUNÇÕES
  exibeDados() {
    console.log(this.nome, this.cpf, this.sexo, this.ruaLogradouro, this.bairro, this.cidade, this.uf)
  }

  salvarAtleta() {
    const pessoaAtleta = new Atleta()
    pessoaAtleta.nome = this.nome
    pessoaAtleta.cpf = this.cpf
    pessoaAtleta.sexo = this.sexo
    pessoaAtleta.cep = this.cep
    pessoaAtleta.ruaLogradoro = this.ruaLogradouro
    pessoaAtleta.bairro = this.bairro
    pessoaAtleta.cidade = this.cidade
    pessoaAtleta.uf = this.uf

    this.atletaService.adicionarAtleta(pessoaAtleta)
    .subscribe({
      next:(resposta)=>{
        console.log(resposta)
      },error:(msgErro)=>{
        console.log("Erro ao cadastrar  o atleta ", msgErro)
      }

    })

       this.limparAtributos()

  }

  listarAtleta(idAtleta: number){
    this.atletaService.listarAtleta(idAtleta)
    .subscribe({
      next:(dados)=>{
        console.table(dados)
      },
      error:(msgErro)=>{
        console.log("Erro ao listar atletas ", msgErro)
      }
    })
  }

  limparAtributos() {
    this.nome = ''
    this.cpf = 0
    this.sexo = ''
    this.cep = 0
    this.ruaLogradouro = ''
    this.bairro = ''
    this.cidade = ''
    this.uf = ''
  }



}
