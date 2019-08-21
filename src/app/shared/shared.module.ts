import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { ModalModule } from 'ngx-bootstrap';
import { SearchPipe } from './pipe/search.pipe';

@NgModule({
  declarations: [LoadingComponent, DeleteModalComponent, SearchPipe],
  imports: [
    CommonModule,
    ModalModule.forRoot()
  ],
  exports: [LoadingComponent, DeleteModalComponent, SearchPipe]
})
export class SharedModule { }
