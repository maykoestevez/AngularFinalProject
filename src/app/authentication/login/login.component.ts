import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { User } from '../models/User';
import { ToastrService } from 'ngx-toastr';
import { userConstants } from 'src/app/users/models/user-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public showLoading: boolean;
  private timer: any;
  public user: User;
  constructor(private loginService: LoginService,
    private router: Router,
    private toastService: ToastrService, ) {
    this.user = new User();
  }

  ngOnInit() {
    this.loginService.LogOut();
  }

  async login() {
    this.showLoading = true;
    const resultUser = await this.loginService
      .login(this.user.userName, this.user.password);
    if (!resultUser) {
      this.showLoading = false;
      this.toastService.error(userConstants.USERNOTVALID, userConstants.USERLOGIN);
      return;
    }

    this.timer = setInterval(() => {
      this.router.navigate(['home']);
      this.loginService.storeUser(resultUser);
      this.showLoading = false;
      clearInterval(this.timer);
    }, 2000);


  }

}
