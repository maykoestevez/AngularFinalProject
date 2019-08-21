import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { User } from 'src/app/authentication/models/User';
import { LoginService } from 'src/app/authentication/services/login.service';

@Component({
  selector: 'app-topmenu',
  templateUrl: './topmenu.component.html',
  styleUrls: ['./topmenu.component.scss']
})
export class TopmenuComponent implements OnInit {

  @Output() showSideMenu: EventEmitter<boolean> = new EventEmitter();
  public showMenu = false;
  public currentUser: User;
  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.currentUser = this.loginService.getCurrentUser();
  }
  toggle() {
    this.showMenu = this.showMenu ? false : true;
    this.showSideMenu.emit(this.showMenu);
  }
}
