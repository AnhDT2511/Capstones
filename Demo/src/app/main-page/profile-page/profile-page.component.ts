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

  listImageName: any = [];
  user: any = {};
  userTemp: any = {};
  userDetails: any = {
    'fullName' : null,
    'address' : null,
    'gender' : null,
    'job' : null,
    'phoneNumber' : null,
    'dob' : null,
    'id' : null,
  };
  userDetailsTemp: any = {};
  // model: any = {};
  viewPersionInfo: boolean = true;
  checkUserDetails: boolean = true;
  urlImage = SystemConstants.BASE_IMAGE;
  baseFolder: String = SystemConstants.BASE_IMAGE;
  resultImage : any = [];
  
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

  getListImage(ImageName) {
    // console.log(ImageName);
    this.resultImage =  this.formUpload.upload(ImageName,0);
    setTimeout(() => {
      this.upLoadImage();
    }, 300);
  }

  upLoadImage() {
    let image = {
      'name': this.resultImage[0],
      'deleted': 0,
      'createdTime': Date.now(),
      'accountID': this.user.id
    };
    if (this.user.avatar != 'default-user-image.png') {
      image['id'] = this.user.imageID;
      this.commonService.updateImage(image, data => {
      })
    } else {
      this.commonService.addImage(image, data => {
      })
    }
    this.user['avatar'] = this.resultImage[0];
  }

  getUserDetails(id: string) {
    this.commonService.getImageByAccountID(id, data => {
      let findAvatar = data.find(item => item.accountID == id && item.tourByDayID == 0);
      this.user['avatar'] = findAvatar != undefined ? findAvatar.name : 'default-user-image.png';
      findAvatar != undefined ? this.user.imageID = findAvatar.id : this.user.imageID = 0 ;
    })
    this.dataService.get('/user/accountdetail-by-accountID/' + id).subscribe((response: any) => {
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
    
  }
  openInfo() {
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
