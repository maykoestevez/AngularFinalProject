import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { userConstants } from '../models/user-constants';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {


  public usersList$: Promise<Array<User>>;
  public selectedUser: User;
  public show = false;
  public showModal: boolean;
  constructor(private userService: UserService, private toastService: ToastrService) {
    this.selectedUser = new User();
  }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    try {
      this.usersList$ = this.userService.getAll();
    } catch (error) {
      this.toastService.error(error.message, userConstants.USERLIST);
    }

  }
  setSelected(user: User, event: Event) {
    this.show = true;
    event.stopPropagation();
    this.selectedUser = user;

  }

  async delete() {
    try {
      await this.userService.delete(this.selectedUser.id);
      this.getAllUsers();
      this.show = false;
      this.toastService.success(userConstants.USERDELETED, userConstants.USERLIST);
    } catch (error) {
      this.toastService.error(error.message, userConstants.USERLIST);
    }
  }
  onHideModal() {
    this.show = false;
  }

}
