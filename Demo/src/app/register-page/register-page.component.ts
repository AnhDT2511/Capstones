import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../shared/service/notification.service';
import { RegisterService } from '../shared/service/register.service';
import { MessageContstants } from '../shared/common/message.constants';
import { UrlConstants } from '../shared/common/url.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})

export class RegisterComponent implements OnInit {
  loading = false;
  model: any = {
    photoId: "../../assets/img/default-user-image.png",   //defaut
    credit: 78,                                            //defaut
    point: 55,                                             //defaut
    deleted: 1,                                           //defaut
    roleId: 2                                             //defaut
  };
  
  constructor(
    private registerService: RegisterService,
    private notificationService: NotificationService,
    private router: Router) { }

  ngOnInit() {
  }

  register() {
    console.log("Hello", this.model);
    this.loading = true;
    this.registerService.register(this.model).subscribe(data => {
      if(data !== null){
        this.notificationService.printSuccessMessage(MessageContstants.REGISTER_SUCCESS);
        this.router.navigate([UrlConstants.LOGIN]);
        //console.log(data);
      }else{
        this.notificationService.printErrorMessage(MessageContstants.REGISTER_FAILED);
        this.loading = false;
      }
    }, error => {
      this.notificationService.printErrorMessage(MessageContstants.REGISTER_FAILED);
      this.loading = false;
    });
  }
}
