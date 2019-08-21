import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from '../core/services/auth-guard.service';
import { RoleGuard } from '../core/services/role-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'user-list', pathMatch: 'full' },
  { path: 'user-list', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'user/:id', component: UserComponent, canActivate: [RoleGuard, AuthGuard] },
  { path: 'user-add', component: UserComponent, canActivate: [RoleGuard, AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
