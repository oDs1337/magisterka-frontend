import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { IPrompt } from '../interfaces/IPrompt';
import { environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http: HttpClient = inject(HttpClient);

  sendPrompt(prompt: string): Observable<IPrompt>{
    return this.http.post<IPrompt>(`${environment.apiUrl}/ask`, { prompt });
  }
}
