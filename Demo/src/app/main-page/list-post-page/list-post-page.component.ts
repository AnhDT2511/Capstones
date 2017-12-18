import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../shared/service/notification.service';
import { MessageContstants } from '../../shared/common/message.constants';
import { UrlConstants } from '../../shared/common/url.constants';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UtilityService } from '../../shared/service/utility.service';
import { SystemConstants } from '../../shared/common/system.constants';
import { DataService, CommonService } from '../../shared/index';
import { InfoContstants } from '../../shared/common/info.constants';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post-page.component.html',
  styleUrls: ['./list-post-page.component.css']
})

export class ListPostPageComponent implements OnInit {
  user: any = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
  loading = false;
  model: any = {};
  listTourPost: any = [];
  listTourPostTemp: any = [];
  returnUrl: string;
  textSearch: any = "";
  typeSearch: any = 1;
  changeText: boolean = false;
  listPlace: any = InfoContstants.CITY_VN;
  listCategory: any = InfoContstants.CATEGORY;
  baseFolder: String = SystemConstants.BASE_IMAGE;
  constructor(
    private notificationService: NotificationService,
    private utilityservice: UtilityService,
    private dataService: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService
  ) {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.dataService.get('/tours/post/get-all').subscribe((response: any) => {
        if (params.id == 0) {
          this.listTourPost = response.filter(item => item.deleted == 0 && item.type == 0);
        } else {
          this.changeText = true;
          this.listTourPost = response.filter(item => item.deleted == 0 && item.type == 1);
        }
        this.listTourPostTemp = JSON.parse(JSON.stringify(this.listTourPost));
        setTimeout(() => {
          this.listTourPost.forEach(element => {
            this.commonService.getNumberComment(element.id, data => {
              typeof (data) == "object" ? element['countComment'] = 0 : element['countComment'] = data;
            });
            this.commonService.getAllLike(data => {
              element['countLike'] = data != undefined ? data.filter(item => item.tourPostID == element.id && item.deleted == 0).length : '';
            })
            this.commonService.getImageByAccountID(element.accountID, data => {
              let image = data.find(item => item.deleted == 0 && item.tourByDayID == 0 && item.tourPostID == 0);
              element['image'] = image == undefined ? 'user.png' : image.name;
            })
          });
        }, 200)
      })
    })
  }
  showDetail(_tourPost) {
    if(_tourPost.type == 0){
      this.utilityservice.navigate('/main/tourpost/' + _tourPost.id);
    }else{
      this.utilityservice.navigate('/main/grouptour/'+ _tourPost.id);
    }
  }
  ngOnInit() {
  }
  searchByType() {
    switch (Number(this.typeSearch)) {
      case 1:
        this.listTourPost = [];
        this.listTourPost = this.listTourPostTemp.filter(item => item.tourArticleTitle.toLowerCase().indexOf(this.textSearch) >= 0);
        break;
      case 2:
        this.listTourPost = [];
        this.listTourPost = this.listTourPostTemp.filter(item => item.tourArticleTitle.toLowerCase().indexOf(this.textSearch) >= 0);
        break;
      case 3:
        this.listTourPost = [];
        let indexCity = this.listPlace.filter(item => item.title.toLowerCase().indexOf(this.textSearch) >= 0);
        indexCity.forEach(element => {
          this.listTourPostTemp.filter(item => item.startPlaceID == Number(element.id) || item.endPlaceID == Number(element.id)).forEach(e => {
            this.listTourPost.findIndex(i => JSON.stringify(i) == JSON.stringify(e)) == -1 ? this.listTourPost.push(e) : '';
          });;
        });
        break;
      case 4:
        this.listTourPost = [];
        if (this.textSearch != "") {
          let indexCategory = this.listCategory.filter(item => item.title.toLowerCase().indexOf(this.textSearch) >= 0);
          indexCategory.forEach(element => {
            this.listTourPostTemp.filter(item => item.category == Number(element.id)).forEach(e => {
              this.listTourPost.findIndex(i => JSON.stringify(i) == JSON.stringify(e)) == -1 ? this.listTourPost.push(e) : '';
            });;
          });
        } else {
          this.listTourPost = this.listTourPostTemp;
        }
        break;
      case 5:
        this.listTourPost = [];
        if (this.textSearch != "") {
          this.listTourPost = this.listTourPostTemp.filter(item => item.duration == Number(this.textSearch));
        } else {
          this.listTourPost = this.listTourPostTemp;
        }
        break;
    }
  }
  logout() {
    window.localStorage.removeItem('CURRENT_USER');
    this.notificationService.printSuccessMessage('Đăng xuất thành công!');
    this.utilityservice.navigate(UrlConstants.HOME);
  }
}
