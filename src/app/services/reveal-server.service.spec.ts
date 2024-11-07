import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RevealServerService } from './reveal-server.service';

describe('RevealServerService', () => {
  let service: RevealServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(RevealServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
