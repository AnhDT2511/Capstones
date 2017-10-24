
import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { UtilityService } from '../../shared/service/utility.service';
import { UrlConstants } from '../../shared/common/url.constants';
import { NotificationService } from '../../shared/service/notification.service';
import { AuthenService } from '../../shared/service/authen.service';
import { DataService } from '../../shared/service/data.service';


@Component({
  selector: 'app-profile-page',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
  
export class ProfilePageComponent implements OnInit {
  user : any = this.authentication.getLoggedInUser();
  userDetails : any = {};
  constructor(
    private utilityService : UtilityService, 
    private notifyService : NotificationService , 
    private authentication : AuthenService,
    private dataService : DataService
  ) { 
  }

  ngOnInit() {
    this.getUserDetails();

  }

  getUserDetails(){
    this.dataService.get("/user/accountdetails/1").subscribe((response: any) => {
      console.log(response);
      this.userDetails["fullName"] = response.firstName + " " + response.lastName;
      this.userDetails["address"] = response.address;
      this.userDetails["gender"] = response.gender;
      this.userDetails["job"] = response.job;
      this.userDetails["phoneNumber"] = response.phoneNumber;
      this.userDetails["dob"] = response.dob;
    });;
  }

  logout(){
    window.localStorage.removeItem("CURRENT_USER");
    this.notifyService.printSuccessMessage("Đăng xuất thành công");
    this.utilityService.navigate(UrlConstants.LOGIN);
    // this.notifyService.printConfirmationDialog("Bạn có chắc chắn muốn đăng xuất?" , this.resetLogin)
  }
}
