import { TestBed } from '@angular/core/testing';

import { CallApiService } from './call-api.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MOCK_CATEGORIES } from './mock';
import { of } from 'rxjs';
describe('CallApiService', () => {
  let service: CallApiService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.inject(CallApiService);
    spyOn(service, 'getListCategories').and.returnValue(of(MOCK_CATEGORIES));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should get list categories', (done) => {
    service.getListCategories().subscribe(
      (categories) => {
        expect(categories.length).toEqual(8);
      },
      (err) => {
        console.log('error', err);
      },
      () => {
        done();
      }
    );
  });
});
