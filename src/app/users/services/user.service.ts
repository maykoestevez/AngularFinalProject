import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from 'src/app/core/services/url.service';
import { User } from 'src/app/authentication/models/User';

@Injectable({ providedIn: 'root' })
export class UserService {
    private baseUrl = `${UrlService.APIURL}user/`;

    constructor(private httpClient: HttpClient) { }

    async getAll(): Promise<Array<User>> {
        return await this.httpClient.get<Array<User>>(this.baseUrl).toPromise();
    }

    async getById(id: number): Promise<User> {
        return await this.httpClient.get<User>(`${this.baseUrl}${id}`).toPromise();
    }

    async update(product: User) {
        return await this.httpClient.put(this.baseUrl, product).toPromise();
    }
    async add(product: User) {
        return await this.httpClient.post(this.baseUrl, product).toPromise();
    }
    async delete(id: number) {
        return await this.httpClient.delete(`${this.baseUrl}${id}`).toPromise();
    }

}
