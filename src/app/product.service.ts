import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // apiEndpoint!:'https://dummyjson.com/'
  http = inject(HttpClient)
  constructor(private http1: HttpClient) { 
    
  }
  getProducts(url:any): Observable<object>{
    return this.http.get(url)
  }
}
