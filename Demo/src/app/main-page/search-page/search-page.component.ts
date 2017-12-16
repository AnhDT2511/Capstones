import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../shared/service/notification.service';
import { MessageContstants } from '../../shared/common/message.constants';
import { UrlConstants } from '../../shared/common/url.constants';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { UtilityService, AuthenService, CommonService } from '../../shared/index';
import { SystemConstants } from '../../shared/common/index';

@Component({
  selector: 'app-search',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})

export class SearchPageComponent implements OnInit {
  user: any;
  typeSearch: any ;
  textSearch: any = "";
  listResultTourPost: any = [];
  listResultGroupTour: any = [];
  baseFolder : String = SystemConstants.BASE_IMAGE;
  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private notifyService: NotificationService,
    private utilityService: UtilityService,
    private activatedRoute: ActivatedRoute,
    private authentication: AuthenService,
    private commonService: CommonService,
  ) {
    this.user = this.authentication.getLoggedInUser();
    this.activatedRoute.params.subscribe((params: Params) => {
      this.typeSearch = params.id;
      this.textSearch = params.text;
      this.searchByType();
    })

  }

  ngOnInit() {

  }
  showDetail(item){
    this.utilityService.navigate('/main/tourpost/'+ item.id);
  }
  getImage(data){
    this.listResultTourPost = [];
    this.listResultGroupTour = [];
    data.forEach(element => {
      let tourPost = element;
      this.commonService.getImageByAccountID(element.accountID,i => {
        let image = i.find(item => item.deleted == 0 && item.tourPostID == 0 && item.tourByDayID == 0);
        tourPost['image'] = image == undefined ?  'user.png' : image.name;
        tourPost.type == 0 ? this.listResultTourPost.push(tourPost) : this.listResultGroupTour.push(tourPost);
      })
    });;
  }
  searchByType() {
    if (this.textSearch != "") {
      switch (Number(this.typeSearch)) {
        case 1: {
          this.commonService.searchByTitle(this.textSearch, data => {
            this.getImage(data);
          });
          break;
        }
        case 2: {
          // this.commonService.searchByAccount(this.textSearch,data => {
          //   this.listResult = data;
          // })
          break;
        }
        case 3: {
          // this.commonService.searchByAccount(this.textSearch,data => {
          //   this.listResult = data;
          // })
          break;
        }
        case 4: {
          // this.commonService.searchByAccount(this.textSearch,data => {
          //   this.listResult = data;
          // })
          break;
        }
        case 5: {
          this.commonService.searchByDuration(this.textSearch,data => {
            this.getImage(data);
          })
          break;
        }
        default: {
          // do something
        }
      }
    } else {
      this.notifyService.printErrorMessage("Xin hãy nhập từ khóa cần tìm kiếm");
    }
  }
  logout() {
    window.localStorage.removeItem('CURRENT_USER');
    this.notifyService.printSuccessMessage('Đăng xuất thành công!');
    this.utilityService.navigate(UrlConstants.LOGIN);
  }
}
