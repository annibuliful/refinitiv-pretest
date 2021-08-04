import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export const API_URL = 'https://api.publicapis.org/categories';

@Injectable({
  providedIn: 'root',
})
export class CallApiService {
  constructor(private http: HttpClient) {}

  getListCategories(): Observable<string[]> {
    return this.http.get<string[]>(API_URL);
  }
}
