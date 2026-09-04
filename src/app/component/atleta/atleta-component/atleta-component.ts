import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AtletaService } from '../../../service/atleta-service';
import { Atleta } from '../../../models/Atleta';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-atleta-component',
  imports: [FormsModule],
  templateUrl: './atleta-component.html',
  styleUrl: './atleta-component.css',
})
export class AtletaComponent implements OnInit {

  // DECLARAÇÃO DOS ATRIBUTOS DO COMPONENTE
  id = 0
  nome = ''
  cpf = 0
  sexo = ''
  cep = 0
  rua_logradouro = ''
  bairro = ''
  cidade = ''
  uf = ''
  data_nascimento = ''
  peso = 0
  altura = 0

  editar = false
  idAtleta = 0
  
  // Array para guardar a lista que será exibida na tela
  listaDeAtletas: Atleta[] = [] 

  // DECLARAÇÃO DO CONSTRUTOR  
  constructor(
    private atletaService: AtletaService, 
    private route: ActivatedRoute, 
    private cdr: ChangeDetectorRef) 
    { }

  ngOnInit() {
    // Carrega a lista de todos os atletas assim que a tela abre
    this.carregarListaAtletas()

    this.idAtleta = Number(this.route.snapshot.paramMap.get('id'))

    if (this.idAtleta > 0) {
      this.editar = true
      this.carregaCampo(this.idAtleta)
    }
  }

  // DECLARAÇÃO DE FUNÇÕES
  exibeDados() {
    console.log(this.nome, this.cpf, this.sexo, this.rua_logradouro, this.bairro, this.cidade, this.uf, this.peso, this.altura)
  }

  carregaCampo(idAtleta: number) {
    this.atletaService.listarAtleta(idAtleta)
      .subscribe({
        next: (objAtleta) => {
          this.id = objAtleta.id
          this.nome = objAtleta.nome
          this.cpf = objAtleta.cpf
          this.sexo = objAtleta.sexo
          this.cep = objAtleta.cep
          this.rua_logradouro = objAtleta.rua_logradouro
          this.bairro = objAtleta.bairro
          this.cidade = objAtleta.cidade
          this.uf = objAtleta.uf
          this.data_nascimento = objAtleta.data_nascimento
          this.peso = objAtleta.peso
          this.altura = objAtleta.altura

          // PARA DETECTAR ALTERAÇÃO NO COMPONENTE
          this.cdr.detectChanges()

        }, error: (msgErro) => {
          console.log("Erro ao Listar o atleta ", msgErro)
        }
      })
  }

  enviaDadosAtleta() {
    const pessoaAtleta = new Atleta()
    pessoaAtleta.nome = this.nome
    pessoaAtleta.cpf = this.cpf
    pessoaAtleta.sexo = this.sexo
    pessoaAtleta.cep = this.cep
    pessoaAtleta.rua_logradouro = this.rua_logradouro
    pessoaAtleta.bairro = this.bairro
    pessoaAtleta.cidade = this.cidade
    pessoaAtleta.uf = this.uf
    pessoaAtleta.data_nascimento = this.data_nascimento
    pessoaAtleta.peso = this.peso
    pessoaAtleta.altura = this.altura

    if (!this.editar) {
      this.atletaService.adicionarAtleta(pessoaAtleta)
        .subscribe({
          next: (resposta) => {
            console.log(resposta)
            this.carregarListaAtletas() // Atualiza a tabela após salvar
          },
          error: (msgErro) => {
            console.log("Erro ao cadastrar o atleta ", msgErro)
          }
        })
    } else {
      pessoaAtleta.id = this.idAtleta
      
      this.atletaService.alterarAtleta(pessoaAtleta)
        .subscribe({
          next: (resposta) => {
            console.log(resposta)
            this.carregarListaAtletas() // Atualiza a tabela após editar
          },
          error: (msgErro) => {
            console.log("Erro ao alterar o atleta ", msgErro)
          }
        })
    }

    this.limparAtributos()
  }

  // Busca a lista completa do backend para exibir na tabela
  carregarListaAtletas() {
    this.atletaService.listarAtletas()
      .subscribe({
        next: (dados) => {
          this.listaDeAtletas = dados
        },
        error: (msgErro) => {
          console.log("Erro ao carregar lista de atletas ", msgErro)
        }
      })
  }

  // Retorna os dados de um atleta específico no console (sua função original)
  listaAtleta(idAtleta: number) {
    this.atletaService.listarAtleta(idAtleta)
      .subscribe({
        next: (dados) => {
          console.table(dados)
        },
        error: (msgErro) => {
          console.log("Erro ao listar atletas ", msgErro)
        }
      })
  }

  // Calcula o IMC para ser usado no HTML
  calcularIMC(peso: number, altura: number): string {
    if (!peso || !altura) return '0.00'
    
    // Se a altura vier inteira (ex: 180 ao invés de 1.80), converte para metros
    const alturaEmMetros = altura > 3 ? altura / 100 : altura
    
    const imc = peso / (alturaEmMetros * alturaEmMetros)
    return imc.toFixed(2)
  }

  limparAtributos() {
    this.nome = ''
    this.cpf = 0
    this.sexo = ''
    this.cep = 0
    this.rua_logradouro = ''
    this.bairro = ''
    this.cidade = ''
    this.uf = ''
    this.data_nascimento = ''
    this.peso = 0
    this.altura = 0
  }
}