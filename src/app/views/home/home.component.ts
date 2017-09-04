import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {
  @ViewChild('myModal') public myModal: ModalDirective;
  date: Date = new Date();

  constructor(
    private vcr: ViewContainerRef,
    private toaster: ToastsManager
  ) {
    this.toaster.setRootViewContainerRef(vcr);
  }

  openModal() {
    this.myModal.show();
  }

  closeModal() {
    this.myModal.hide();
  }

  showToaster() {
    this.toaster.error('Errore');
  }
}
