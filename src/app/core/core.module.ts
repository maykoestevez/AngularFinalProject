
import { NgModule } from '@angular/core';
import { TopmenuComponent } from './components/topmenu/topmenu.component';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthenticationModule } from '../authentication/authentication.module';

@NgModule({
  declarations: [TopmenuComponent, SidemenuComponent, FooterComponent],
  imports: [CommonModule, RouterModule, AuthenticationModule],
  providers: [],
  exports: [TopmenuComponent, SidemenuComponent, FooterComponent]
})
export class CoreModule { }
