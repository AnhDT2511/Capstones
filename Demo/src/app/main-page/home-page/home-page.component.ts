import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { UtilityService } from '../../shared/service/utility.service';
import { UrlConstants } from '../../shared/common/url.constants';
import { NotificationService } from '../../shared/service/notification.service';
import { AuthenService } from '../../shared/service/authen.service';
import { TourPost } from '../../shared/domain/tourPost.user';
import { DataService } from '../../shared/service/data.service';
import { SystemConstants } from '../../shared/common/system.constants';
import { Like } from '../../shared/domain/like.user';
import { debug } from 'util';
import { CommonService } from '../../shared/index';
import { InfoContstants } from '../../shared/common/index';

@Component({
  selector: 'app-home-page',
  // encapsulation: ViewEncapsulation.None,
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {

  public user: any = this.authentication.getLoggedInUser();
  baseFolder: String = SystemConstants.BASE_IMAGE;
  public checkLogin: any = false;
  public searchWord: any = {};
  public listTourPost: any[] = [];
  public listTourPostFavoriteBefore: any[] = [];
  public listTourPostFavoriteAfter: any[] = [];
  public listGroupTour: any[] = [];
  public listLikeObj;
  listTypeSearch = {
    1: 'title',
    2: 'place',
    3: 'category',
    4: 'duration',
  }
  constructor(
    private utilityService: UtilityService,
    private notifyService: NotificationService,
    private authentication: AuthenService,
    private dataService: DataService,
    private commonService: CommonService
  ) {
    if (!InfoContstants.isEmpty(this.user)) {
      this.checkLogin = true;
    }
  }

  ngOnInit() {
    this.getAllTourPost();
  }
  search(id) {
    this.utilityService.navigate('/main/search/' + id + '/' + this.searchWord[this.listTypeSearch[id]]);
  }

  likeTourPost(tourPost: any, type: any) {
    let existLike: any;
    if (!InfoContstants.isEmpty(this.user)) {
      existLike = this.listLikeObj.find(item => item.likeByID == this.user.id && item.tourPostID == tourPost.id);
    }
    if (this.user != null && existLike == undefined) {
      let _like = new Like(null, tourPost.id, this.user.id, 0);
      this.dataService.post('/tours/post/' + tourPost.id + '/Like', _like).subscribe((response: any) => {
        this.commonService.getAllLike(data => {
          this.listLikeObj = JSON.parse(JSON.stringify(data));
        })
        tourPost.liked = true;
        tourPost.countLike++;
      }, error => {
      });
      this.notifyService.printSuccessMessage(type ? 'Thích bài viết thành công!' : 'Thích nhóm thành công!');
    } else if (this.user != null && existLike != undefined) {
      let _relike = new Like(existLike.id, tourPost.id, this.user.id, 0);
      if (existLike.deleted === 0) {
        _relike.deleted = 1;
        existLike.deleted = 1;
        this.notifyService.printErrorMessage(type ? 'Bỏ thích bài viết thành công!' : 'Bỏ thích nhóm thành công!');
        tourPost.liked = false;
        tourPost.countLike--;
      } else {
        existLike.deleted = 0;
        this.notifyService.printSuccessMessage(type ? 'Thích bài viết thành công!' : 'Thích nhóm thành công!');
        tourPost.liked = true;
        tourPost.countLike++;
      }
      this.dataService.put('/tours/post/' + tourPost.id + '/Like', _relike).subscribe((response: any) => {
      }, error => {
      });
    } else {
      this.notifyService.printErrorMessage('Xin hãy đăng nhập trước khi thực hiện hành động này!');
    }
  }

  getAllTourPost() {
    this.commonService.getAllLike(data => {
      this.listLikeObj = data;
    })
    setTimeout(() => {
      this.dataService.get('/tours/post/get-all').subscribe((response: any) => {
        for (var i in response) {
          if (response[i].type == 0 && response[i].deleted == 0) {
            let _tourPost = response[i];
            _tourPost['countLike'] = this.listLikeObj != undefined ? this.listLikeObj.filter(item => item.tourPostID == _tourPost.id && item.deleted == 0).length : '';
            if (this.checkLogin) {
              _tourPost['liked'] = this.listLikeObj != undefined ? this.listLikeObj.findIndex(item => item.likeByID == this.user.id && item.tourPostID == _tourPost.id && item.deleted == 0) != -1 ? true : false : '';
            }
            this.commonService.getNumberComment(_tourPost.id, data => {
              typeof (data) == "object" ? _tourPost['countComment'] = 0 : _tourPost['countComment'] = data;
            });
            this.commonService.getImageByTourPostID(_tourPost.id, data => {
              data.length > 0 ? _tourPost['image'] = data[0].name : _tourPost['image'] = 'default-tour-post.jpg'
            })
            _tourPost.description.length > 100 ? _tourPost.description = _tourPost.description.slice(0,97) + " ..." : _tourPost.description;
            this.listTourPost.push(_tourPost);
          } else if (response[i].deleted == 0) {
            let _groupTour = response[i];
            _groupTour.startPlaceID = InfoContstants.CITY_VN.find(item => item.id == _groupTour.startPlaceID).title;
            _groupTour.endPlaceID = InfoContstants.CITY_VN.find(item => item.id == _groupTour.endPlaceID).title;
            this.commonService.getNumberMember(_groupTour.id, data => {
              typeof (data) == "object" ? _groupTour['countMember'] = 0 : _groupTour['countMember'] = data;
            });
            this.commonService.getImageByAccountID(_groupTour.accountID, data => {
              let image = data.find(item => item.deleted == 0 && item.tourByDayID == 0 && item.tourPostID == 0);
              _groupTour['image'] = image == undefined ? 'user.png' : image.name;
            })
            this.listGroupTour.push(_groupTour);
          }
        }
        for (let i = 0; i < 3; i++) {
          if (this.listTourPost[i]) {
            this.listTourPostFavoriteBefore.push(this.listTourPost[i])
          }
        }
        for (let i = 3; i < 6; i++) {
          if (this.listTourPost[i]) {
            this.listTourPostFavoriteAfter.push(this.listTourPost[i])
          }
        }
      }, error => {
      });
    }, 300)
  }
  detailGroupTour(_groupTour) {
    this.utilityService.navigate('/main/grouptour/' + _groupTour.id);
  }

  detailTourPost(_tourPost) {
    this.utilityService.navigate('/main/tourpost/' + _tourPost.id);
  }

  seeMore(id) {
    if (id == 1) {
      // localStorage.removeItem("listTourPost");
      // localStorage.setItem("listTourPost", JSON.stringify(this.listTourPost));
      this.utilityService.navigate("/main/listpost/0");
    } else {
      // localStorage.removeItem("listGroupPost");
      // localStorage.setItem("listGroupPost", JSON.stringify(this.listTourPost));
      this.utilityService.navigate("/main/listpost/1");
    }
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
  //   // this.userName = null;
  //   window.localStorage.removeItem("CURRENT_USER");
  // }
}
