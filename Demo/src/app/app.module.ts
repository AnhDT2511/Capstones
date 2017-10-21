import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Http , HttpModule} from '@angular/http';
import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  LoginService
} from './shared';
import {SharedModule} from '../app/shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
