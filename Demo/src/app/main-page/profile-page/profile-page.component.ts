import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { UrlConstants, SystemConstants } from '../../shared/common';
import { TextChangePassComponent } from './dialog-change-pass/dialog-change-pass.component';
import {
  DataService,
  NotificationService,
  AuthenService,
  UtilityService
} from '../../shared/service';
import { ActivatedRoute, Params } from '@angular/router';
import { TextChangeInfoComponent } from './dialog-change-info/dialog-change-info.component';
import { CommonService } from '../../shared/index';
import { FormUploadComponent } from '../../shared/form-upload/form-upload.component';

@Component({
  selector: 'app-profile-page',
  // encapsulation: ViewEncapsulation.None,
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})

export class ProfilePageComponent implements OnInit {
  @ViewChild(TextChangePassComponent)
  private textChangePass: TextChangePassComponent;

  @ViewChild(TextChangeInfoComponent)
  private textChangeInfo: TextChangeInfoComponent;

  @ViewChild(FormUploadComponent)
  private formUpload: FormUploadComponent;

  listImageName : any = [];
  user: any = {};
  userTemp: any = {};
  userDetails: any = {};
  userDetailsTemp: any = {};
  valid = true;
  // model: any = {};
  viewPersionInfo: boolean = true;
  checkUserDetails: boolean = true;

  constructor(
    private utilityService: UtilityService,
    private notifyService: NotificationService,
    private authentication: AuthenService,
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService
  ) {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.user['id'] = params['id'];
      if (this.user.id == 0) {
        this.viewPersionInfo = false;
        this.user = this.authentication.getLoggedInUser();
      } else {
        this.commonService.getAccountInfo(this.user.id, data => {
          this.user = data;
        });
        this.viewPersionInfo = true;
      }
      localStorage.removeItem('userID');
      localStorage.setItem('userID', this.user.id);
      localStorage.removeItem('viewPersional');
      localStorage.setItem('viewPersional', this.viewPersionInfo.toString());
      this.getUserDetails(this.user.id);
    });
  }

  openChangePass() {
    this.textChangePass.openDialog();
  }
  openChangeInfo() {
    this.textChangeInfo.openDialog();
  }

  ngOnInit() {

  }

  getListImage(ImageName){
    this.commonService.uploadImage({
      'name' : ImageName,
      'deleted' : 0,
      'createdTime' : Date.now(),
      'accountID' : this.user.id
    },data =>{
    })
  }

  getUserDetails(id: string) {
    this.commonService.getImageByAccountID(id,data => {
      console.log(data);
    })
    this.dataService.get('/user/accountdetails/' + id).subscribe((response: any) => {
      this.userDetails['fullName'] = response.firstName + ' ' + response.lastName;
      this.userDetails['address'] = response.address;
      this.userDetails['gender'] = response.gender;
      this.userDetails['job'] = response.job;
      this.userDetails['phoneNumber'] = response.phoneNumber;
      this.userDetails['dob'] = response.dob;
      this.userDetails['id'] = response.id;
    }, error => {
      this.checkUserDetails = false;
    });
  }

  saveUserInfo() {
    console.log(this.listImageName);
    // this.dataService.put("/user/account", JSON.stringify(this.user)).subscribe((response: any) => {
    //   localStorage.removeItem(SystemConstants.CURRENT_USER);
    //   localStorage.setItem(SystemConstants.CURRENT_USER, JSON.stringify(this.user));
    // }, error => {
    //   this.valid = false;
    // });

    // this.userDetails['firstName'] = this.userDetails.fullName.substr(0, this.userDetails.fullName.indexOf(' '));
    // this.userDetails['lastName'] = this.userDetails.fullName.substr(this.userDetails.fullName.indexOf(' ') + 1);
    // this.userDetails['accountId'] = this.user.id;
    // delete this.userDetails['fullName'];

    // this.getUserDetails(this.user.id);
    // if (this.checkUserDetails) {
    //   this.dataService.put("/user/accountdetails", JSON.stringify(this.userDetails)).subscribe((response: any) => {
    //     this.userDetails["fullName"] = this.userDetails.firstName + " " + this.userDetails.lastName;
    //   }, error => {
    //     this.valid = false;
    //   });
    // } else {
    //   this.dataService.post("/user/accountdetails", JSON.stringify(this.userDetails)).subscribe((response: any) => {
    //     this.userDetails["fullName"] = this.userDetails.firstName + " " + this.userDetails.lastName;
    //   }, error => {
    //     this.valid = false;
    //   });
    // }
    // if (this.valid) {
    //   this.notifyService.printSuccessMessage('Cập nhật thông tin người dùng thành công!');
    // } else {
    //   this.notifyService.printErrorMessage('Có lỗi xảy ra khi cập nhật thông tin người dùng, xin hãy thử lại!');
    // }

  }
  openInfo(){
    this.userTemp = JSON.parse(JSON.stringify(this.user));
    this.userDetailsTemp = JSON.parse(JSON.stringify(this.userDetails));
  }
  closeInfo() {
    this.user = this.userTemp;
    this.userDetails = this.userDetailsTemp;
  }
  logout() {
    window.localStorage.removeItem('CURRENT_USER');
    this.notifyService.printSuccessMessage('Đăng xuất thành công!');
    this.utilityService.navigate(UrlConstants.HOME);
  }

  // openCreatePost() {
  //   this.utilityService.navigate('/main/createpost');
  // }
}
