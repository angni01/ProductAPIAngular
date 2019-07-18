import {Injectable} from '@angular/core'
import {HttpClient , HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable()

export class ProductServices{
    url: string = 'https://localhost:5001/api/products/'
    constructor(private http: HttpClient) {}

    getProduct() : Observable<any[]>{
        return this.http.get<any[]>(this.url);
    }
    addProduct(newProduct:any) {
        return this.http.post(this.url, newProduct);
    }
    updateProduct(product: any): Observable<any[]> {
        return this.http.put<any[]>(this.url+product.id, product);      
    }
    deleteProduct(id: number): Observable<any[]> {
        return this.http.delete<any[]>(this.url+id);
       
      }
    
}