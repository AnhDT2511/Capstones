import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from './shared';
import { RegisterService } from './shared/service/register.service';
import { CreatePostService } from './shared/service/createpost.service';
import { SharedModule } from '../app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AvatarModule } from 'ngx-avatar';
import { UploadComponent } from './shared/upload/upload.component';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import {NgAutoCompleteModule} from "ng-auto-complete";

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    SharedModule,
    AvatarModule,
    NgAutoCompleteModule,
    SlimLoadingBarModule.forRoot(),
  ],
  providers: [
    LoginService,
    RegisterService,
    CreatePostService,
    // AccountService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
