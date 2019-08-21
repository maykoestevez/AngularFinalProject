import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { User } from 'src/app/authentication/models/User';
import { LoginService } from 'src/app/authentication/services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {

  public _showSideMenu = true;
  public currentUser: User;

  @Input()
  set showSideMenu(showMenu: boolean) {
    if (!showMenu) {
      this._showSideMenu = true;
      return;
    }
    this._showSideMenu = false;
  }

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.currentUser = this.loginService.getCurrentUser();
  }

  hideSideMenu() {
    this.showSideMenu = true;
  }
  logout() {
    this.loginService.LogOut();
  }

}
