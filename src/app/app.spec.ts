import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { ActivatedRoute, provideRouter } from '@angular/router';
describe('App', () => {
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App], // O seu componente App já deve estar aqui
      providers: [
        provideRouter([]), // Simula o roteador principal
        { 
          provide: ActivatedRoute, 
          useValue: { snapshot: { paramMap: { get: () => '0' } } } 
        }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
