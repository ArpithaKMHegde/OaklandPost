import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITestModel } from '../models/test-model';

@Injectable({
  providedIn: 'root'
})
export class DbTestService {

  constructor(private httpClient: HttpClient) {
  }

  public getTestData(): Observable<ITestModel[]> {
    return this.httpClient.get<ITestModel[]>("api/test/get");
  }
}
