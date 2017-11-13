
import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { UtilityService } from '../../shared/service/utility.service';
import { UrlConstants } from '../../shared/common/url.constants';
import { NotificationService } from '../../shared/service/notification.service';
import { AuthenService } from '../../shared/service/authen.service';
import { DataService } from '../../shared/service/data.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { debug } from 'util';
import { TourPost } from '../../shared/domain/tourPost.user';
import { Like } from '../../shared/domain/like.user';


@Component({
  selector: 'app-tour-post-page',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './tour-post-page.component.html',
  styleUrls: ['./tour-post-page.component.css']
})

export class TourPostPageComponent implements OnInit {
  user: any = this.authentication.getLoggedInUser();
  // userDetails : any = {};
  tourPostId: string;
  tourPost: any;
  tourByDay: any = [];
  tourByDayDetail: any = [];
  statusComment: boolean = true;
  hideForm : boolean = true;
  listPlace : any = ['Ha Noi',
    'Da Nang',
    'Sai Gon',
    'Quang Ninh',
    'Hai Phong',
    'Bac Lieu',
    'Nha Trang'];
  constructor(
    private utilityService: UtilityService,
    private notifyService: NotificationService,
    private authentication: AuthenService,
    private dataService: DataService,
    private activatedRoute: ActivatedRoute
  ) {
    // this.activatedRoute.params.subscribe((params: Params) => {
    //   this.tourPostId = params.id;
    //   this.dataService.get('/tours/post/'+ params.id).subscribe((response: any) => {
    //     // console.log(response);
    //     this.tourPost = response;
    //   }, error => {
    //   });
    // });
    this.tourPost = JSON.parse(localStorage.getItem("tourPost"));
    this.dataService.get('/tours/post/' + this.tourPost.id + '/get-all').subscribe((response: any) => {
      // console.log(response);
      this.tourByDay = response;
    }, error => {
    });
    this.dataService.get('/tours/post/' + this.tourPost.id + '/day/1/detail/get-all').subscribe((response: any) => {
      // console.log(response);
      for (let i in response) {
        if (response[i].tourByDayID == this.tourByDay[0].id) {
          this.tourByDayDetail.push(response[i]);
        }
      }
    }, error => {
    });
  }

  ngOnInit() {
    // this.getUserDetails();

  }

  nagivateProfile() {
    this.utilityService.navigate(UrlConstants.PROFILE);
  }

  openCloseCmt() {
    this.statusComment = !this.statusComment;
  }

  likeTourPost(tourPost: any) {
    if (this.user != null && !tourPost.liked) {
      let _like = new Like(null, tourPost.id, this.user.id, 0);
      this.dataService.post('/tours/post/' + tourPost.id + '/Like', _like).subscribe((response: any) => {
        this.tourPost.liked = true;
        this.tourPost.countLike++;
        localStorage.removeItem("tourPost");
        localStorage.setItem("tourPost",JSON.stringify(this.tourPost));
      }, error => {
      });
      this.notifyService.printSuccessMessage("Thích bài viết thành công");
    } else if (this.user != null && tourPost.liked) {
      // let _dislike = new Like(tourPost.likedID,tourPost.id,this.user.id,1);
      // console.log(_dislike);
      // this.dataService.put('/tours/post/' + tourPost.id + '/Like',_dislike).subscribe((response: any) => {
      //   var item = this.listTourPost.findIndex(item => item.id === response[0].tourPostID);
      //   this.listTourPost[item]["countLike"] = response.length;
      // }, error => {
      // });
      this.notifyService.printSuccessMessage("Bỏ thích bài viết thành công");
    } else {
      this.notifyService.printErrorMessage("Xin hãy đăng nhập trước khi thực hiện hành động này");
    }
  }

  logout() {
    window.localStorage.removeItem("CURRENT_USER");
    this.user = this.authentication.getLoggedInUser();
    this.notifyService.printSuccessMessage("Đăng xuất thành công");
    // this.notifyService.printConfirmationDialog("Bạn có chắc chắn muốn đăng xuất?" , this.resetLogin)
  }


}
