import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './bootstrap.component.html',
  styleUrls: ['./bootstrap.component.sass']
})
export class BootstrapComponent {


  constructor(
    private toaster: ToastrService
  ) {
  }

}
