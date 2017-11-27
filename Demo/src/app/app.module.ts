import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from './shared';
import { RegisterService } from './shared/service/register.service';
import { CreatePostService } from './shared/service/createpost.service';
import { SharedModule } from '../app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AvatarModule } from 'ngx-avatar';
import { ImageUploadModule } from 'angular2-image-upload';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    SharedModule,
    Ng2SmartTableModule,
    AvatarModule,
    ImageUploadModule.forRoot()
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
