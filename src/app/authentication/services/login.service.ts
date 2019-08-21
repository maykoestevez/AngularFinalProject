import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from 'src/app/core/services/url.service';
import { User } from '../models/User';

@Injectable({ providedIn: 'root' })
export class LoginService {

    private baseUrl = `${UrlService.APIURL}user`;
    constructor(private httpClient: HttpClient) { }

    async login(user: string, password: string): Promise<User> {
        const loginUrl = `${this.baseUrl}/login/${user}/${password}`;
        return await this.httpClient.get<User>(loginUrl).toPromise();
    }

    async isAdmin(userId: number): Promise<boolean> {
        const adminUrl = `${this.baseUrl}/isAdmin/${userId}`;
        const role = await this.httpClient.get<boolean>(adminUrl).toPromise();
        return role;
    }

    public storeUser(user: User) {
        const userBaseData = {
            'fullName': user.fullName,
            'id': user.id,
            'isAdmin': user.isAdmin
        };
        localStorage.setItem('user', JSON.stringify(userBaseData));
    }

    public getCurrentUser(): User {
        const user: User = JSON.parse(localStorage.getItem('user'));
        return user;
    }

    async IsLogged() {
        return await this.httpClient.get<boolean>(`${this.baseUrl}/isLogged`).toPromise();
    }

    async LogOut() {
        return await this.httpClient.get(`${this.baseUrl}/LogOut`).toPromise();
    }
}
