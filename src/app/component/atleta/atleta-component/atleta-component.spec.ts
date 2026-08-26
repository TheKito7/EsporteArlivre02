import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { AtletaComponent } from './atleta-component';

describe('AtletaComponent', () => {
  let component: AtletaComponent;
  let fixture: ComponentFixture<AtletaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { 
          provide: ActivatedRoute, 
          useValue: { snapshot: { paramMap: { get: () => '0' } } } 
        }
      ], // <-- Corrigido aqui: colchete fechando o array e vírgula!
      imports: [AtletaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AtletaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});