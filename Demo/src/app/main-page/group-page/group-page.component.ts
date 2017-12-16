import { Component, OnInit } from '@angular/core';
import { DataService, UtilityService, NotificationService, CommonService } from '../../shared/service';
import { SystemConstants, InfoContstants ,UrlConstants} from '../../shared/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthenService } from '../../shared/index';
import { Comment } from '../../shared/domain/comment.user';

@Component({
  selector: 'app-group-tour',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.css']
})
export class GroupPageComponent implements OnInit {
  user: any = this.authentication.getLoggedInUser();
  checkLogin: any = false;
  groupTourId: string;
  listComment: any;
  listMember: any = [];
  listJoinGroup: any = [];
  comment: string = "";
  joined: boolean = true;
  groupTour: any = {};
  listCategory: any = {
    '1': 'Leo núi',
    '2': 'Văn Hóa',
    '3': 'Hành trình',
  }
  listCity: any = InfoContstants.CITY_VN;

  constructor(
    private dataService: DataService,
    private utiliservice: UtilityService,
    private notifyservice: NotificationService,
    private commonService: CommonService,
    private activatedRoute: ActivatedRoute,
    private authentication: AuthenService
  ) {
    if (!InfoContstants.isEmpty(this.user)) {
      this.checkLogin = true;
    }
    this.activatedRoute.params.subscribe((params: Params) => {
      this.groupTourId = params.id;
      this.dataService.get('/tours/post/' + params.id).subscribe((response: any) => {
        this.groupTour = response;
        this.groupTour.postViewNumber += 1;
        this.commonService.updatePost(this.groupTour, data => {
          this.loadComment();
          this.loadMember();
        });
        this.groupTour.startPlaceID =  this.listCity.find(item => item.id == this.groupTour.startPlaceID).title ;
        this.groupTour.endPlaceID =  this.listCity.find(item => item.id == this.groupTour.endPlaceID).title ;
      }, error => {
      });
    });
  }

  ngOnInit() {
  }

  joinGroup() {
    if (this.checkLogin) {
      let joined = this.listJoinGroup.findIndex(item => item.joinGroupByID == this.user.id);
      let _joinGroup = {
        'tourPostID': this.groupTour.id,
        'joinGroupByID': this.user.id,
        'deleted': 0,
        'createTime': Date.now()
      }
      if (joined == -1) {
        this.commonService.joinGroup(_joinGroup, data => {
          this.notifyservice.printSuccessMessage('Tham gia chuyến đi thành công :D');
          this.loadMember();
        })
      } else {
        _joinGroup['id'] = this.listJoinGroup[joined].id;
        _joinGroup['updatedTime'] = Date.now();
        if (this.listJoinGroup[joined].deleted == 0) {
          _joinGroup.deleted = 1;
          this.notifyservice.printSuccessMessage('Hủy tham gia chuyến đi thành công :( ');
        } else {
          _joinGroup.deleted = 0;
          this.notifyservice.printSuccessMessage('Tham gia chuyến đi thành công :D');
        }
        delete _joinGroup['createTime'];
        this.commonService.updateJoinGroup(_joinGroup, data => {
          this.loadMember();
        })
      }
    }else{
      this.notifyservice.printErrorMessage('Xin hãy đăng nhập trước khi thực hiện hành động này!');
    }
  }
  
  nagivateProfile() {
    this.utiliservice.navigate(UrlConstants.PROFILE);
  }

  loadMember() {
    this.listMember = [];
    this.commonService.getMemberGroup(this.groupTour.id, data => {
      this.listJoinGroup = data;
      if (this.checkLogin) {
        this.joined = data.findIndex(item => item.joinGroupByID == this.user.id && item.deleted == 0) != -1 ? true : false
      }
      data.forEach(element => {
        if (element.deleted == 0) {
          this.commonService.getAccountInfo(element.joinGroupByID, item => {
            this.listMember.push(item);
          })
        }
      });
    })
  }

  sendComment() {
    if (this.checkLogin && !InfoContstants.isEmpty(this.comment)) {
      let _comment = new Comment(this.comment, this.groupTour.id, this.user.id);
      this.dataService.post('/tours/post/' + this.groupTour.id + '/comment', _comment).subscribe((response: any) => {
        this.loadComment();
        this.notifyservice.printSuccessMessage('Thêm bình luận thành công')
      }, error => {
      });
    } else if(this.checkLogin && InfoContstants.isEmpty(this.comment)){
      this.notifyservice.printErrorMessage('Bình luận không nên để trống');
    }else{
      this.notifyservice.printErrorMessage('Xin hãy đăng nhập trước khi thực hiện hành động này!');
    }
  }

  loadComment() {
    this.dataService.get('/tours/post/' + this.groupTour.id + '/comment/get-all').subscribe((response: any) => {
      this.listComment = response;
      for (var i in this.listComment) {
        this.dataService.get('/user/account/' + this.listComment[i].commentByID).subscribe((response: any) => {
          for (var i in this.listComment) {
            if (this.listComment[i].commentByID == response.id) {
              this.listComment[i]['userName'] = response.userName;
            }
          }
        }, error => {
        });
      }
    }, error => {
    });
  }

  logout() {
    window.localStorage.removeItem("CURRENT_USER");
    this.checkLogin = false;
    this.notifyservice.printSuccessMessage("Đăng xuất thành công");
  }
}
