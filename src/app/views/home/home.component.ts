import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {
  @ViewChild('myModal') public myModal: ModalDirective;

  openModal() {
    this.myModal.show();
  }

  closeModal() {
    this.myModal.hide();
  }
}
