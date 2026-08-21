import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { InscricaoComponent } from './inscricao-component';

describe('InscricaoComponent', () => {
  let component: InscricaoComponent;
  let fixture: ComponentFixture<InscricaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscricaoComponent ], // Declara o componente que estamos testando
      imports: [ 
        HttpClientTestingModule, // Simula o HttpClient dos serviços
        FormsModule              // Necessário para o [(ngModel)] do formulário funcionar
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscricaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});