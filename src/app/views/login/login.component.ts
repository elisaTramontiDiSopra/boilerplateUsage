import { Component } from '@angular/core';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  user: any = {}
  isLoading: boolean;

  login() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
    // this.api.login(this.user).subscribe(
    //   res => {

    //   }, error => {
    //     this.toaster.error(error);
    //   }
    // );
  }
}
