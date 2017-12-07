import { Component, OnInit, Inject, ViewEncapsulation, Input  } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService, NotificationService } from '../../../shared/service';
import { SystemConstants} from '../../../shared/common';

@Component({
  selector: 'app-text-change-info',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './text-change-info.component.html',
})
export class TextChangeInfoComponent {
  @Input() userInfo: any;
  constructor(public dialog: MatDialog) { 
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogChangeInfoComponent, {
      width: '250px',
      data : this.userInfo
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
  model : any = {};
  passOldValid = true;
  hide = true;
  constructor(
    public dialogRef: MatDialogRef<DialogChangeInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private dataService: DataService,
    private notifyService: NotificationService
  ) { }
    
    

  // checkPassOld() {
  //   this.data.password === this.model.oldpwd ? this.passOldValid = true : this.passOldValid = false;
  // }
  
  savePassChanged() {
    // this.checkPassOld();
    // if (this.model.renewpwd === this.model.newpwd && this.passOldValid) {
    //   this.data.password = this.model.renewpwd;
    //   this.dataService.put('/user/account', JSON.stringify(this.data)).subscribe((response: any) => {
    //     localStorage.removeItem(SystemConstants.CURRENT_USER);
    //     localStorage.setItem(SystemConstants.CURRENT_USER, JSON.stringify(this.data));
    //     this.notifyService.printSuccessMessage('Cập nhật mật khẩu thành công');
    //   }, error => {
    //     this.notifyService.printErrorMessage("Có lỗi xảy ra khi cập nhật thông tin người dùng, xin hãy thử lại!!");
    //   });
    // }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}