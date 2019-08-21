import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { LoginService } from 'src/app/authentication/services/login.service';
import { User } from 'src/app/users/models/user';
import {Location} from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { userConstants } from 'src/app/users/models/user-constants';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
    constructor(private loginService: LoginService, private toastService: ToastrService, ) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.loginService.getCurrentUser();
        if (! await this.loginService.isAdmin(currentUser.id)) {
            this.toastService.error(userConstants.USERROLENOTVALID,userConstants.USERROLE);
            return false;
        }
        return true;
    }
}
