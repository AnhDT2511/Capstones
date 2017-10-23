
import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { UtilityService } from '../../shared/service/utility.service';
import { UrlConstants } from '../../shared/common/url.constants';
import { NotificationService } from '../../shared/service/notification.service';


@Component({
  selector: 'app-home-page',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
  
export class HomePageComponent implements OnInit {
  userName : string = window.localStorage.getItem("CURRENT_USER");
  constructor(private utilityService : UtilityService, private notifyService : NotificationService) { 
  }

  ngOnInit() {
  }
  
  logout(){

    this.notifyService.printConfirmationDialog("Bạn có chắc chắn muốn đăng xuất?" , this.resetLogin);
  }

  resetLogin()  {
    console.log(this.userName);
    window.localStorage.removeItem("CURRENT_USER");
    // this.utilityService.navigate(UrlConstants.LOGIN); 
    // this.userName = null;
    console.log(this.userName);
  }
}
