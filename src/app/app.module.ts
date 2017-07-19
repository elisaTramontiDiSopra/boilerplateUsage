import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

// VIEWS
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';

// C0MPONENTS
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    routing,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
