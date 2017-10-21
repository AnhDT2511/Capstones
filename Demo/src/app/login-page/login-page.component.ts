import {Component , ViewEncapsulation} from '@angular/core';
import {Observable}  from 'rxjs/Observable';
import {LoginService} from '../shared';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-basic',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './login-page.component.html',
  styleUrls : ['./login-page.component.css']
})

export class LoginPageComponent {
  closeResult: string;
  private model = {'email':'', 'password':''};
  private currentUserName;

  constructor(private modalService: NgbModal,private loginService: LoginService) {
    this.currentUserName=localStorage.getItem("currentUserName");
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  
  onSubmit() {
    this.loginService.sendCredential(this.model).subscribe(
      data => {
                console.log(data);
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