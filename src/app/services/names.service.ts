import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NameInfo } from '../models/name-info.model';

@Injectable({
  providedIn: 'root',
})
export class NamesService {
  constructor(private http: HttpClient) {}

  getGodNames() {
    return this.http.get<NameInfo[]>('assets/NamesOfAllah.json');
  }
}
