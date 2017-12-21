import { Component, OnInit } from '@angular/core';
import { DataService, UtilityService, NotificationService, CommonService } from '../../shared/service';
import { SystemConstants, InfoContstants, UrlConstants } from '../../shared/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthenService } from '../../shared/index';
import { Comment } from '../../shared/domain/comment.user';

@Component({
  selector: 'app-group-tour',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.css']
})
export class GroupPageComponent implements OnInit {
  hideJoinRoom: boolean = false;
  user: any = this.authentication.getLoggedInUser();
  checkLogin: any = false;
  groupTourId: string;
  listComment: any = [];
  listMember: any = [];
  listJoinGroup: any = [];
  comment: string = "";
  joined: boolean = true;
  groupTour: any = {};
  nameRoom: String = "";
  createRoom: boolean = false;
  roomInfo: any = {};
  baseFolder: any = SystemConstants.BASE_IMAGE;
  listCategory = InfoContstants.CATEGORY;
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
        this.groupTour.startPlaceID = this.listCity.find(item => item.id == this.groupTour.startPlaceID).title;
        this.groupTour.endPlaceID = this.listCity.find(item => item.id == this.groupTour.endPlaceID).title;
        this.groupTour.category = this.listCategory.find(item => item.id == this.groupTour.category).title;
        setTimeout(() => {
          this.commonService.getInfoChatRoom(this.groupTourId, data => {
            if (JSON.stringify(data) == "{}" && this.groupTour.accountID == this.user.id) {
              this.createRoom = true;
              this.hideJoinRoom = true;
            } else if (JSON.stringify(data) == "{}" && this.groupTour.accountID != this.user.id) {
              this.hideJoinRoom = true;
            } else if (this.joined != true) {
              this.hideJoinRoom = true;
              this.roomInfo = data;
            } else {
              this.hideJoinRoom = false;
              this.roomInfo = data;
            }
          })
        }, 300)
      }, error => {
      });

    });
  }

  ngOnInit() {

  }
  createOrJoin() {
    if (this.createRoom) {
      window.location.href = SystemConstants.BASE_API + "/chat/create/" + this.nameRoom + "/" + Number(this.user.id) + "/" + Number(this.groupTourId);
    } else {
      window.location.href = SystemConstants.BASE_API + "/chat/join/" + this.roomInfo.roomName + "/" + Number(this.roomInfo.id) + "/" + Number(this.user.id);
    }
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
          this.hideJoinRoom = false;
          this.notifyservice.printSuccessMessage('Tham gia chuyến đi thành công');
          this.loadMember();
        })
      } else {
        _joinGroup['id'] = this.listJoinGroup[joined].id;
        _joinGroup['updatedTime'] = Date.now();
        if (this.joined) {
          _joinGroup.deleted = 1;
          this.hideJoinRoom = true;
          this.notifyservice.printErrorMessage('Hủy tham gia chuyến đi thành công ');
          // console.log(this.listJoinGroup);
        } else {
          _joinGroup.deleted = 0;
          this.hideJoinRoom = false;
          this.notifyservice.printSuccessMessage('Tham gia chuyến đi thành công');
        }
        delete _joinGroup['createTime'];
        this.commonService.updateJoinGroup(_joinGroup, data => {
          this.loadMember();
        })
      }
    } else {
      this.notifyservice.printErrorMessage('Xin hãy đăng nhập trước khi thực hiện hành động này!');
    }
  }

  nagivateProfile() {
    this.utiliservice.navigate(UrlConstants.PROFILE);
  }


  loadMember() {
    this.listMember = [];
    this.listJoinGroup = [];
    this.commonService.getMemberGroup(this.groupTour.id, data => {
      this.listJoinGroup = data;
      if (this.checkLogin) {
        this.joined = data.findIndex(item => item.joinGroupByID == this.user.id && item.deleted == 0) != -1 ? true : false
      }
      data.forEach(element => {
        if (element.deleted == 0) {
          let account = element;
          this.commonService.getAccountInfo(element.joinGroupByID, item => {
            account = item;
          })
          setTimeout(() => {
            this.commonService.getImageByAccountID(element.joinGroupByID, data => {
              let image = data.find(item => item.deleted == 0 && item.tourByDayID == 0 && item.tourPostID == 0);
              account['image'] = image == undefined ? 'user.png' : image.name;
            })
            this.listMember.push(account);
          }, 200)
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
        this.comment = "";
      }, error => {
      });
    } else if (this.checkLogin && InfoContstants.isEmpty(this.comment)) {
      this.notifyservice.printErrorMessage('Bình luận không nên để trống');
    } else {
      this.notifyservice.printErrorMessage('Xin hãy đăng nhập trước khi thực hiện hành động này!');
    }
  }

  loadComment() {
    //lấy tất cả commment
    this.listComment = [];
    this.dataService.get('/tours/post/' + this.groupTour.id + '/comment/get-all').subscribe((response: any) => {
      for (var i in response) {
        let group = response[i];
        // lấy dữ liệu người dùng  
        this.dataService.get('/user/account/' + group.commentByID).subscribe((res: any) => {
          group['userName'] = res.userName;
          this.commonService.getImageByAccountID(group.commentByID, data => {
            let image = data.find(item => item.deleted == 0 && item.tourByDayID == 0 && item.tourPostID == 0);
            group['image'] = image == undefined ? 'user.png' : image.name;
          })
          setTimeout(() => {
            this.listComment.push(group);
          }, 300)
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
    this.utiliservice.navigate(UrlConstants.HOME);
  }
}
