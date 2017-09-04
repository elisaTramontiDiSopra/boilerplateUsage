import { Component, ViewContainerRef } from '@angular/core';
import { AuthService, LoadingService } from 'app';
import { ToastsManager } from 'ng2-toastr';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  user: any = {}

  constructor(
    private auth: AuthService,
    private loadingService: LoadingService,
    private vcr: ViewContainerRef,
    private toaster: ToastsManager
  ) {
    this.toaster.setRootViewContainerRef(vcr);
  }

  login() {
    this.loadingService.start();
    setTimeout(() => {
      this.auth.login(this.user).subscribe(
        res => {
          this.loadingService.stop()
        }, error => {
          this.toaster.error(error);
          this.loadingService.stop()
        }
      );
    }, 3000);
  }
}
