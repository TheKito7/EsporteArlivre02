import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InscricaoService } from './inscricao-service';

describe('InscricaoService', () => {
  let service: InscricaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Necessário para simular o HttpClient
      providers: [InscricaoService]
    });
    service = TestBed.inject(InscricaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});