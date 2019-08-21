import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { userConstants } from '../models/user-constants';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public usersForm: FormGroup;
  private isNewItem = true;

  constructor(private userService: UserService,
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private toastService: ToastrService,
    private router: Router) {

    this.usersForm = this.formBuilder.group({
      id: [0, [Validators.required]],
      fullName: ['', [Validators.required, Validators.maxLength(100)]],
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      isAdmin: [false],
      status: [true]
    });
  }

  ngOnInit() {
    this.activeRoute.params.subscribe((params) => {
      if (params['id']) {
        this.isNewItem = false;
        const userId = params['id'];
        this.getUserById(userId);
      }
    });
  }

  async getUserById(id: number) {
    try {
      const user = await this.userService.getById(id);
      this.usersForm.patchValue(user);
    } catch (error) {
      this.toastService.error(error.message, userConstants.USERMANAGE);
    }

  }

  saveChanges() {
    this.isNewItem ? this.save() : this.update();
  }

  async save() {
    try {
      await this.userService.add(this.usersForm.value);
      this.toastService.success(userConstants.USERADDED, userConstants.USERMANAGE);
      this.router.navigate(['/home/users/user-list']);
    } catch (error) {
      this.toastService.error(error.message, userConstants.USERMANAGE);
    }
  }

  async update() {
    try {
      await this.userService.update(this.usersForm.value);
      this.toastService.success(userConstants.USERUPDATED, userConstants.USERMANAGE);
      this.router.navigate(['/home/users/user-list']);
    } catch (error) {
      this.toastService.error(error.message, userConstants.USERMANAGE);
    }
  }

}
