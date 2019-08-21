import { Component, OnInit, TemplateRef, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { template } from '@angular/core/src/render3';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent {

  modalRef: BsModalRef;
  @Input() isModalShown = false;

  @ViewChild('modal') modal: ModalDirective;
  @Input() message: string;
  @Output() delete: EventEmitter<boolean> = new EventEmitter();
  @Output() whenHideModal: EventEmitter<boolean> = new EventEmitter();
  constructor(private modalService: BsModalService) { }

  hideModal(): void {
    this.modal.hide();
  }

  onHidden(): void {
    this.whenHideModal.emit();
    this.isModalShown = false;
  }

  confirm(): void {
    this.delete.emit();

  }

  decline(): void {
    this.isModalShown = false;
  }


}
