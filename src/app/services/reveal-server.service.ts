import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { DashboardNames } from '../models/reveal-server/dashboard-names';
import { ErrorHandlerService } from './error-handler.service';

const API_ENDPOINT = 'http://localhost:5111';

@Injectable({
  providedIn: 'root'
})
export class RevealServerService {
  constructor(
    private http: HttpClient
  ) { }

  public getDashboardNamesList(): Observable<DashboardNames[]> {
    return this.http.get<DashboardNames[]>(`${API_ENDPOINT}/dashboards/names`)
      .pipe(catchError(ErrorHandlerService.handleError<DashboardNames[]>('getDashboardNamesList', [])));
  }
}
