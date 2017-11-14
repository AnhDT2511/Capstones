import { DataService } from '../../shared/service/data.service';
import { CreatePostService } from '../../shared/service/createpost.service';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../shared/service/notification.service';
import { AuthenService } from '../../shared/service/authen.service';
import { MessageContstants } from '../../shared/common/message.constants';
import { UrlConstants } from '../../shared/common/url.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post-page.component.html',
  styleUrls: ['./create-post-page.component.css']
})

export class CreatePostComponent implements OnInit {
  user: any = this.authenService.getLoggedInUser();
  userDetails: any = {};
  loading = false;
  model: any = {};
  returnUrl: string;
  constructor(
    private createPostService: CreatePostService,
    private authenService: AuthenService,
    private dataService: DataService,
    private notificationService: NotificationService,
    private router: Router) { }

  ngOnInit() {
    this.getUserDetails(this.user.id);
  }

  getUserDetails(id: string) {
    this.dataService.get('/user/accountdetails/' + id).subscribe((response: any) => {
      this.userDetails['fullName'] = response.firstName + ' ' + response.lastName;
      this.userDetails['address'] = response.address;
      this.userDetails['gender'] = response.gender;
      this.userDetails['job'] = response.job;
      this.userDetails['phoneNumber'] = response.phoneNumber;
      this.userDetails['dob'] = response.dob;
      this.userDetails['id'] = response.id;
    });
  }

  createPost() {
    this.loading = true;
    console.log(this.model);
    this.createPostService.createPost(this.model).subscribe(data => {
      if (data !== null) {
        this.notificationService.printSuccessMessage(MessageContstants.CREATE_POST_SUCCESS);
        // this.router.navigate([UrlConstants.LOGIN]);
        console.log(data);
      }else {
        this.notificationService.printErrorMessage(MessageContstants.CREATE_POST_FAILED);
        this.loading = false;
      }
    }, error => {
      this.notificationService.printErrorMessage(MessageContstants.CREATE_POST_FAILED);
      this.loading = false;
    });
  }

}
