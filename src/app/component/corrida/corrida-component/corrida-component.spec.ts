import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CorridaComponent } from './corrida-component';
import { FormsModule } from '@angular/forms';
import { CorridaService } from '../../../service/corrida/corrida-service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Corrida } from '../../../models/Corrida';

describe('CorridaComponent', () => {
  let component: CorridaComponent;
  let fixture: ComponentFixture<CorridaComponent>;
  let mockCorridaService: any;
  let mockActivatedRoute: any;

  const mockCorrida: Corrida = {
    id: 1,
    descricao_corrida: 'Meia Maratona Teste',
    data_corrida: '2026-10-12',
    distancia5km: true,
    distancia10km: false,
    distancia25km: true
  };

  beforeEach(async () => {
    // 1. Simulação usando Jest em vez do Jasmine
    mockCorridaService = {
      salvarCorrida: vi.fn().mockReturnValue(of(mockCorrida)),
      alterarCorrida: vi.fn().mockReturnValue(of(mockCorrida)),
      listarCorrida: vi.fn().mockReturnValue(of(mockCorrida))
    };

    mockActivatedRoute = {
      snapshot: { paramMap: { get: () => '0' } }
    };

    await TestBed.configureTestingModule({
      imports: [CorridaComponent, FormsModule],
      providers: [
        { provide: CorridaService, useValue: mockCorridaService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CorridaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar os dados da corrida quando o método carregaDados for chamado', () => {
    component.carregaDados(1);
    
    expect(mockCorridaService.listarCorrida).toHaveBeenCalledWith(1);
    expect(component.descricao_corrida).toBe('Meia Maratona Teste');
    // 2. Corrigido de toBeTrue() para toBe(true)
    expect(component.distancia25km).toBe(true); 
  });

  it('deve chamar salvarCorrida quando o formulário for enviado em modo de cadastro', () => {
    component.editar = false;
    component.descricao_corrida = 'Corrida de Rua Nova';
    
    component.dadosFormulario();
    
    expect(mockCorridaService.salvarCorrida).toHaveBeenCalled();
    expect(component.descricao_corrida).toBe(''); 
  });

  it('deve chamar alterarCorrida quando o formulário for enviado em modo de edição', () => {
    component.editar = true;
    component.idCorrida = 1;
    
    component.dadosFormulario();
    
    expect(mockCorridaService.alterarCorrida).toHaveBeenCalled();
  });
});