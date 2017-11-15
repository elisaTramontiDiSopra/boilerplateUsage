import { Component } from '@angular/core';
import { AuthService, LoadingService } from 'app';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  user: any = {}
  isLoading: boolean;

  constructor(
    private auth: AuthService,
    private loadingService: LoadingService,
    private toaster: ToastrService
  ) {
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
