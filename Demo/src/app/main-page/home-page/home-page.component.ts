
import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { UtilityService } from '../../shared/service/utility.service';
import { UrlConstants } from '../../shared/common/url.constants';
import { NotificationService } from '../../shared/service/notification.service';
import { AuthenService } from '../../shared/service/authen.service';
import { TourPost } from '../../shared/domain/tourPost.user';
import { DataService } from '../../shared/service/data.service';
import { SystemConstants } from '../../shared/common/system.constants';

@Component({
  selector: 'app-home-page',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {

  public user: any = this.authentication.getLoggedInUser();
  public listTourPost: TourPost[] = [];
  public listTourPostLike: any = [];
  constructor(
    private utilityService: UtilityService,
    private notifyService: NotificationService,
    private authentication: AuthenService,
    private dataService: DataService
  ) {
  }

  ngOnInit() {
    this.getAllTourPost();
    // debugger;
    // setTimeout(function(){ 
    //   debugger;
    //   for(var i = 0 ; i < this.listTourPost.length ; i++){
    //     alert(i);
    //     console.log(i);
    //   }
    // }, 2000);
    
  }

  detailTourPost(id){
    this.utilityService.navigate('/main/tourpost/index/'+ id)
  }
  
  countLike() {
    for (var i in this.listTourPost) {
      this.dataService.get('/tours/post/' + this.listTourPost[i].id + '/like/get-all').subscribe((response: any) => {
        this.listTourPostLike.push(response.length);
      }, error => {
      });
    }
  }

  getAllTourPost() {
    this.dataService.get('/tours/post/get-all').subscribe((response: any) => {
      for (var i in response) {
        this.listTourPost.push(this.getTourPost(response[i]));
      }
      this.countLike();
    }, error => {
    });
  }


  getTourPost(tourpost): TourPost {
    let _tourPost: TourPost;
    _tourPost = new TourPost(
      tourpost.id,
      tourpost.accountID,
      tourpost.startPlaceID,
      tourpost.endPlaceID,
      tourpost.duration,
      tourpost.tourArticleTitle,
      tourpost.deleted,
      tourpost.createTime,
      tourpost.description,
      tourpost.vehicle,
    )
    return _tourPost;
  }
  nagivateProfile() {
    this.utilityService.navigate(UrlConstants.PROFILE);
  }



  logout() {
    window.localStorage.removeItem("CURRENT_USER");
    this.user = this.authentication.getLoggedInUser();
    this.notifyService.printSuccessMessage("Đăng xuất thành công");
    // this.notifyService.printConfirmationDialog("Bạn có chắc chắn muốn đăng xuất?" , this.resetLogin)
  }

  // resetLogin()  {
  //   // this.utilityService.navigate(UrlConstants.LOGIN); 
  //   console.log(this.userName);
  //   debugger;
  //   // this.userName = null;
  //   window.localStorage.removeItem("CURRENT_USER");
  // }
}
