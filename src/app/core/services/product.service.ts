import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}
  // private API_PRODUCT: string = 'http://localhost:8081/api';

  private API_PRODUCT: string = 'https://productos-api-e9d77897ab1c.herokuapp.com/api';
  // private API_PRODUCT: string = 'https://api-productos-e7b0f210a2ee.herokuapp.com/api'; //FILTROS PRODUCTO


  getAllProd() {
    return this.http.get(`${this.API_PRODUCT}/productos`);
  };

  getAllProducts(product: any) {
    return this.http.post(this.API_PRODUCT, product).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

  getProductById(id: number): Observable<any> {
    return this.http.get(`${this.API_PRODUCT}/GetProductById/${id}`).pipe(
      map((resp: any) => {
        console.log('DATA_BY_ID', resp);

        return resp.result;
      })
    );
  };

  createProduct(product: any): Observable<any> {
    return this.http.post(this.API_PRODUCT, product);
  }

  updateProduct(id: number, requestProduct: any) {
    return this.http.put<any>(`${this.API_PRODUCT}/${id}`, requestProduct);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API_PRODUCT}/${id}`);
  }

}
