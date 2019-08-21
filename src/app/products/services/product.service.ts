import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from 'src/app/core/services/url.service';
import { Products } from '../models/products';

@Injectable({ providedIn: 'root' })
export class ProductService {

    private baseUrl = `${UrlService.APIURL}product/`;

    constructor(private httpClient: HttpClient) { }

    async getAll(): Promise<Array<Products>> {
        return await this.httpClient.get<Array<Products>>(this.baseUrl).toPromise();
    }

    async getById(id: number): Promise<Products> {
        return await this.httpClient.get<Products>(`${this.baseUrl}${id}`).toPromise();
    }

    async update(product: Products) {
        return await this.httpClient.put(this.baseUrl, product).toPromise();
    }
    async add(product: Products) {
        return await this.httpClient.post(this.baseUrl, product).toPromise();
    }
    async delete(id: number) {
        return await this.httpClient.delete(`${this.baseUrl}${id}`).toPromise();
    }
}
