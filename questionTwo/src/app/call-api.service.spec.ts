import { TestBed } from '@angular/core/testing';

import { CallApiService } from './call-api.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
describe('CallApiService', () => {
  let service: CallApiService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.inject(CallApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should get list categories', (done) => {
    service.getListCategories().subscribe((categories) => {
      console.log('cat', categories);
      expect(categories.length).toBeGreaterThan(1);
      done();
    });
  });
});
