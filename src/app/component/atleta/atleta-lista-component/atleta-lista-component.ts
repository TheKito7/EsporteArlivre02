import { Component, signal } from '@angular/core';
import { AtletaService } from '../../../service/atleta-service';
import { Atleta } from '../../../models/Atleta';
import { Router } from '@angular/router';

@Component({
  selector: 'app-atleta-lista-component',
  imports: [],
  templateUrl: './atleta-lista-component.html',
  styleUrl: './atleta-lista-component.css',
})
export class AtletaListaComponent {

  //DECLARAÇÃO ARRAY DO TIPO PESSOA
  //listaAtletas: Atleta[] = []
  listaAtletas = signal<Atleta[]>([])

  //DECLARAÇÃO CONSTRUTOR
  constructor(private router: Router, private http: AtletaService) { }

  //EXECUTAR INSTRUÇÕES AO CARREGAR CRIAR O COMPONENTE
  ngOnInit() {
    this.listarAtletas()
  }

  //LISTAR OS ATLETAS
  listarAtletas() {
    this.http.listarAtletas()
      .subscribe({
        next: (dados) => {
          //this.listaAtletas = [...dados].sort((a, b) => a.nome.localeCompare(b.nome))
          this.listaAtletas.set([...dados].sort((a, b) => a.nome.localeCompare(b.nome)))
        },
        error: (msgErro) => {
          console.log("Erro ao cadastrar  o atleta ", msgErro)
        }

      })

  }

  calcularIdade(dataNascimento: string): number | string {
    if (!dataNascimento) return ''; // Retorna "Não Informado" se estiver vazio
  
    const dataNasc = new Date(dataNascimento);
    
    // Tratamento caso a MockAPI traga os dados falsos antigos como "data_nascimento 1"
    if (isNaN(dataNasc.getTime())) return 'Data Inválida';
  
    const hoje = new Date();
    let idade = hoje.getFullYear() - dataNasc.getFullYear();
    const mes = hoje.getMonth() - dataNasc.getMonth();
  
    // Se o mês atual for menor que o mês de nascimento, ou se for o mesmo mês mas o dia atual for menor, subtrai 1 ano
    if (mes < 0 || (mes === 0 && hoje.getDate() < dataNasc.getDate())) {
      idade--;
    }
  
    return idade;
  }

  //EXCLUIR ATLETA
  excluirAtleta(atleta: Atleta){
    if(confirm(`Deseja excluir ${atleta.nome} da competição? `)){
      this.http.exluirAtleta(atleta)
      .subscribe({
        next:(dados)=>{
           this.listaAtletas.update(elem =>
            elem.filter(a => a.id !== atleta.id)
          );
          
          console.log('Atleta excluído com Sucesso ', dados)
        },
        error: (msgErro) => {
          console.log("Erro ao Excluir  o atleta ", msgErro)
        }
      })

    }
    
    this.ngOnInit()
  }

  //ALTERAR DADOS
  buscarPessoa(idAtleta: Atleta){
    this.router.navigate(['/cadastroatleta', idAtleta])
  }

  
}//FIM COMPONENT AtletaListaComponent
