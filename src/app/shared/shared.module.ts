import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { ModalModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [LoadingComponent, DeleteModalComponent],
  imports: [
    CommonModule,
    ModalModule.forRoot()
  ],
  exports: [LoadingComponent, DeleteModalComponent]
})
export class SharedModule { }
