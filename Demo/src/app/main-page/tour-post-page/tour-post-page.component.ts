
import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { UtilityService } from '../../shared/service/utility.service';
import { UrlConstants } from '../../shared/common/url.constants';
import { NotificationService } from '../../shared/service/notification.service';
import { AuthenService } from '../../shared/service/authen.service';
import { DataService } from '../../shared/service/data.service';
import {Router , ActivatedRoute , Params } from '@angular/router';


@Component({
  selector: 'app-tour-post-page',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './tour-post-page.component.html',
  styleUrls: ['./tour-post-page.component.css']
})

export class TourPostPageComponent implements OnInit {
  user : any = this.authentication.getLoggedInUser();
  // userDetails : any = {};
  tourPostId : string ;
  tourPost : any = {};
  tourByDay: any = [];
  tourByDayDetail: any = [];
  statusComment : boolean = true;

  constructor(
    private utilityService : UtilityService, 
    private notifyService : NotificationService , 
    private authentication : AuthenService,
    private dataService : DataService,
    private activatedRoute: ActivatedRoute
  ) { 
    this.activatedRoute.params.subscribe((params: Params) => {
      this.tourPostId = params.id;
      this.dataService.get('/tours/post/'+ params.id).subscribe((response: any) => {
        // console.log(response);
        this.tourPost = response;
      }, error => {
      });
    });

    this.dataService.get('/tours/post/'+ this.tourPostId +'/day/get-all').subscribe((response: any) => {
      // console.log(response);
       this.tourByDay = response;
    }, error => {
    });

    this.dataService.get('/tours/post/'+ this.tourPostId +'/day/1/detail/get-all').subscribe((response: any) => {
      // console.log(response);
      for(let i in response){
        if(response[i].tourByDayID == this.tourByDay[0].id){
          this.tourByDayDetail.push(response[i]);
        }
      }
    }, error => {
    });

    console.log(this.tourByDayDetail);
  }

  ngOnInit() {
    // this.getUserDetails();

  }

  nagivateProfile() {
    this.utilityService.navigate(UrlConstants.PROFILE);
  }

  openCloseCmt(){
    this.statusComment = !this.statusComment;
  }

  logout() {
    window.localStorage.removeItem("CURRENT_USER");
    this.user = this.authentication.getLoggedInUser();
    this.notifyService.printSuccessMessage("Đăng xuất thành công");
    // this.notifyService.printConfirmationDialog("Bạn có chắc chắn muốn đăng xuất?" , this.resetLogin)
  }

  
}
