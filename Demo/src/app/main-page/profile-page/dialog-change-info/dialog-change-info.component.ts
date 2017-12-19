import { Component, OnInit, Inject, ViewEncapsulation, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService, NotificationService, UtilityService } from '../../../shared/service';
import { SystemConstants, UrlConstants } from '../../../shared/common';
import { AuthenService } from '../../../shared/index';

@Component({
  selector: 'app-text-change-info',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './text-change-info.component.html',
})
export class TextChangeInfoComponent {
  @Input() userInfo: any;
  valid = true;
  constructor(public dialog: MatDialog) {
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogChangeInfoComponent, {
      width: 'auto',
      data: this.userInfo
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-change-info.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class DialogChangeInfoComponent {
  model: any = {};
  hide = true;
  user = this.authentication.getLoggedInUser();
  userDetails: any;
  valid : boolean = true;
  checkUserDetails: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<DialogChangeInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService: DataService,
    private notifyService: NotificationService,
    private authentication: AuthenService,
    private ultilityService : UtilityService
  ) {
    this.userDetails = data;
  }



  // checkPassOld() {
  //   this.data.password === this.model.oldpwd ? this.passOldValid = true : this.passOldValid = false;
  // }

  saveInfoChanged() {
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
    
    
    // this.getUserDetails(this.user.id);
    if (this.userDetails.id != null) {
      this.dataService.put("/user/accountdetails", JSON.stringify(this.userDetails)).subscribe((response: any) => {
        this.userDetails["fullName"] = this.userDetails.firstName + " " + this.userDetails.lastName;
      }, error => {
        this.valid = false;
      });
    } else {
      this.dataService.post("/user/accountdetails", JSON.stringify(this.userDetails)).subscribe((response: any) => {
        this.userDetails["fullName"] = this.userDetails.firstName + " " + this.userDetails.lastName;
      }, error => {
        this.valid = false;
      });
    }
    if (this.valid) {
      this.onNoClick();
      this.notifyService.printSuccessMessage('Cập nhật thông tin người dùng thành công!');
      this.ultilityService.navigate(UrlConstants.PROFILE);
    } else {
      this.onNoClick();
      this.notifyService.printErrorMessage('Có lỗi xảy ra khi cập nhật thông tin người dùng, xin hãy thử lại!');
      this.ultilityService.navigate(UrlConstants.PROFILE);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}