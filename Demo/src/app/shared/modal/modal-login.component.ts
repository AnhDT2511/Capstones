import {Component, Inject , ViewEncapsulation} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {LoginService} from '../service/login.service';

@Component({
    selector: 'app-dialog-login-button',
    encapsulation: ViewEncapsulation.None,
    template: `
       <a class="page-scroll" (click)="openDialog()" >Test</a>
    `
  })
  export class DialogLoginButtonComponent {
  
    private model = {'email':'', 'password':''};
  
    constructor(public dialog: MatDialog , private loginService : LoginService) {}
  
    openDialog(): void {
      let dialogRef = this.dialog.open(ModalLoginComponent, {
        width: '250px',
        data: { email: this.model.email, password: this.model.password }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.model.email = result.email;
        this.model.password = result.password;
        this.onLoginService();
      });
      
    }

    onLoginService() {
            this.loginService.sendCredential(this.model).subscribe(
              data => {
                        // localStorage.setItem("token", JSON.parse(JSON.stringify(data))._body);
                        // this.loginService.sendToken(localStorage.getItem("token")).subscribe(
                        //   data => {
                        //             this.currentUserName=this.model.username;
                        //             localStorage.setItem("currentUserName", this.model.username);
                        //             this.model.username='';
                        //             this.model.password='';
                        //           },
                        //   error => console.log(error)
                        // );
                      },
              error => console.log(error)
            );
    }
  }

  @Component({
    selector: 'app-modal-component',
    templateUrl: 'modal-login.component.html',
  })
  export class ModalLoginComponent {
    hide :boolean =  true ;
    
    constructor(
      public dialogRef: MatDialogRef<ModalLoginComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }