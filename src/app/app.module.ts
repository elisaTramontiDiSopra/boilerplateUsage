import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule }   from '@angular/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { LaddaModule } from 'angular2-ladda';
import { MomentModule } from 'angular2-moment';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AuthService } from 'app';

// VIEWS
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { BootstrapComponent } from './views/bootstrap/bootstrap.component';

// C0MPONENTS
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoadingComponent } from './components/loading-spinner/loading.component';

// SERVICES
import { LoadingService } from './services/loading.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    BootstrapComponent,

    HeaderComponent,
    FooterComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    routing,
    ModalModule.forRoot(),
    LaddaModule,
    MomentModule,
    ToastrModule.forRoot({
      positionClass: 'toast-center' // visup custom class
    })
  ],
  providers: [
    AuthService,
    LoadingService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
