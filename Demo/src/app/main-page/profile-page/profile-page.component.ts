
import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { UtilityService } from '../../shared/service/utility.service';
import { UrlConstants } from '../../shared/common/url.constants';
import { NotificationService } from '../../shared/service/notification.service';
import { AuthenService } from '../../shared/service/authen.service';
import { DataService } from '../../shared/service/data.service';
import { SystemConstants } from '../../shared/common/system.constants';

@Component({
  selector: 'app-profile-page',
  // encapsulation: ViewEncapsulation.None,
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})

export class ProfilePageComponent implements OnInit {
  user: any = this.authentication.getLoggedInUser();
  userDetails: any = {};
  valid: boolean = true;
  model: any = {};
  hide = true;
  passOldValid = true;
  checkUserDetails: boolean = true;
  constructor(
    private utilityService: UtilityService,
    private notifyService: NotificationService,
    private authentication: AuthenService,
    private dataService: DataService
  ) {
  }

  ngOnInit() {
    this.getUserDetails(this.user.id);
  }

  checkPassOld() {
    this.user.password == this.model.oldpwd ? this.passOldValid = true : this.passOldValid = false;
  }

  getUserDetails(id: string) {
    this.dataService.get("/user/accountdetails/" + id).subscribe((response: any) => {
      this.userDetails["fullName"] = response.firstName + " " + response.lastName;
      this.userDetails["address"] = response.address;
      this.userDetails["gender"] = response.gender;
      this.userDetails["job"] = response.job;
      this.userDetails["phoneNumber"] = response.phoneNumber;
      this.userDetails["dob"] = response.dob;
      this.userDetails['id'] = response.id;
    }, error => {
      this.checkUserDetails = false;
    });
  }
  savePassChanged() {
    this.checkPassOld();
    if (this.model.renewpwd == this.model.newpwd && this.passOldValid) {
      this.user.password = this.model.renewpwd;
      this.dataService.put("/user/account", JSON.stringify(this.user)).subscribe((response: any) => {
        localStorage.removeItem(SystemConstants.CURRENT_USER);
        localStorage.setItem(SystemConstants.CURRENT_USER, JSON.stringify(this.user));
        this.notifyService.printSuccessMessage("Cập nhật mật khẩu thành công");
      }, error => {
        this.notifyService.printErrorMessage("Có lỗi xảy ra khi cập nhật thông tin người dùng, xin hãy thử lại!!");
      });
    }

  }
  saveUserInfo() {
    this.dataService.put("/user/account", JSON.stringify(this.user)).subscribe((response: any) => {
      localStorage.removeItem(SystemConstants.CURRENT_USER);
      localStorage.setItem(SystemConstants.CURRENT_USER, JSON.stringify(this.user));
    }, error => {
      this.valid = false;
    });

    this.userDetails['firstName'] = this.userDetails.fullName.substr(0, this.userDetails.fullName.indexOf(' '));
    this.userDetails['lastName'] = this.userDetails.fullName.substr(this.userDetails.fullName.indexOf(' ') + 1);
    this.userDetails['accountId'] = this.user.id;
    delete this.userDetails['fullName'];

    this.getUserDetails(this.user.id);
    if(this.checkUserDetails){
      this.dataService.put("/user/accountdetails", JSON.stringify(this.userDetails)).subscribe((response: any) => {
        this.userDetails["fullName"] = this.userDetails.firstName + " " + this.userDetails.lastName;
      }, error => {
        this.valid = false;
      });
    }else{
      this.dataService.post("/user/accountdetails", JSON.stringify(this.userDetails)).subscribe((response: any) => {
        this.userDetails["fullName"] = this.userDetails.firstName + " " + this.userDetails.lastName;
      }, error => {
        this.valid = false;
      });
    }
    

    if (this.valid) {
      this.notifyService.printSuccessMessage("Cập nhật thông tin người dùng thành công");
    } else {
      this.notifyService.printErrorMessage("Có lỗi xảy ra khi cập nhật thông tin người dùng, xin hãy thử lại!!");
    }

  }
  logout() {
    window.localStorage.removeItem("CURRENT_USER");
    this.notifyService.printSuccessMessage("Đăng xuất thành công");
    this.utilityService.navigate(UrlConstants.LOGIN);
    // this.notifyService.printConfirmationDialog("Bạn có chắc chắn muốn đăng xuất?" , this.resetLogin)
  }
}
