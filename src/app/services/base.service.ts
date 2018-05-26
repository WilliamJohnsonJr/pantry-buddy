import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_ENDPOINT } from '../app.tokens';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor() { }
}
