import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../shared/service/notification.service';
import { MessageContstants } from '../../shared/common/message.constants';
import { UrlConstants } from '../../shared/common/url.constants';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { UtilityService, AuthenService, CommonService, DataService } from '../../shared/index';
import { SystemConstants, InfoContstants } from '../../shared/common/index';

@Component({
  selector: 'app-search',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})

export class SearchPageComponent implements OnInit {
  user: any;
  typeSearch: any;
  textSearch: any = "";
  listResultTourPost: any = [];
  listResultGroupTour: any = [];
  listResultTourPostTemp: any = [];
  listResultGroupTourTemp: any = [];
  listResultTourByDay: any = [];
  listPlace: any = InfoContstants.CITY_VN;
  listCategory: any = InfoContstants.CATEGORY;
  baseFolder: String = SystemConstants.BASE_IMAGE;
  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private notifyService: NotificationService,
    private utilityService: UtilityService,
    private activatedRoute: ActivatedRoute,
    private authentication: AuthenService,
    private commonService: CommonService,
    private dataService: DataService
  ) {
    this.user = this.authentication.getLoggedInUser();
    this.activatedRoute.params.subscribe((params: Params) => {
      this.textSearch = params.text.toLowerCase();
      this.typeSearch = params.id;
      this.searchByType();
    })
  }

  ngOnInit() {
  }
  showDetail(item) {
    this.utilityService.navigate('/main/tourpost/' + item.id);
  }

  getDataOfAll() {
    this.commonService.getAllTourByDay(data =>{
      this.listResultTourByDay = data;
    })
    this.dataService.get('/tours/post/get-all').subscribe((response: any) => {
      let listAll = this.getDataLikeComment(response);
      setTimeout(() => {
        this.listResultTourPostTemp = listAll.filter(item => item.deleted == 0 && item.type == 0);
        this.listResultGroupTourTemp = listAll.filter(item => item.deleted == 0 && item.type == 1);
      }, 250)
    })
  }
  getDataLikeComment(item){
    item.forEach(element => {
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
      this.commonService.getNumberMember(element.id,data => {
        typeof(data) == "object" ? element['countMember'] = 0 : element['countMember'] = data;
      })
    });
    return item;
  }

  nagivateProfile() {
    this.utilityService.navigate(UrlConstants.PROFILE);
  }

  searchByType() {
    if (this.textSearch != "") {
      switch (Number(this.typeSearch)) {
        case 1: {
          //theo tiêu đề
          this.commonService.searchByTitle(this.textSearch.toLowerCase(), data => {
            let listAll = this.getDataLikeComment(data);
            setTimeout(() => {
              this.listResultTourPost = listAll.filter(item => item.deleted == 0 && item.type == 0);
              this.listResultGroupTour = listAll.filter(item => item.deleted == 0 && item.type == 1);
            }, 250)
          });
          break;
        }
        case 2: {
          //theo địa điểm
          this.getDataOfAll();
          this.listResultTourPost = [];
          this.listResultGroupTour = [];
          setTimeout(() => {
            let indexCity = this.listPlace.filter(item => item.title.toLowerCase().indexOf(this.textSearch.toLowerCase()) >= 0);
            indexCity.forEach(element => {
              this.listResultTourByDay.filter(item => item.placeID == Number(element.id)).forEach(e => {
                let tourPostFromTourByDay = this.listResultTourPostTemp.find(i => i.id == e.tourPostID);
                if(tourPostFromTourByDay != undefined){
                  this.listResultTourPost.findIndex(i => JSON.stringify(i) == JSON.stringify(tourPostFromTourByDay)) == -1 ? this.listResultTourPost.push(tourPostFromTourByDay) : '';
                }
              });;
              this.listResultGroupTourTemp.filter(item => item.startPlaceID == Number(element.id) || item.endPlaceID == Number(element.id)).forEach(e => {
                this.listResultGroupTour.findIndex(i => JSON.stringify(i) == JSON.stringify(e)) == -1 ? this.listResultGroupTour.push(e) : '';
              });;
            });
          }, 500)
          break;
        }
        case 3: {
          //theo category
          this.getDataOfAll();
          this.listResultTourPost = [];
          this.listResultGroupTour = [];
          if (this.textSearch != "") {
            setTimeout(() => {
              let indexCategory = this.listCategory.filter(item => item.title.toLowerCase().indexOf(this.textSearch.toLowerCase()) >= 0);
              indexCategory.forEach(element => {
                this.listResultTourPostTemp.filter(item => item.category == Number(element.id)).forEach(e => {
                  this.listResultTourPost.findIndex(i => JSON.stringify(i) == JSON.stringify(e)) == -1 ? this.listResultTourPost.push(e) : '';
                });
                this.listResultGroupTourTemp.filter(item => item.category == Number(element.id)).forEach(e => {
                  this.listResultGroupTour.findIndex(i => JSON.stringify(i) == JSON.stringify(e)) == -1 ? this.listResultGroupTour.push(e) : '';
                });
              });
            }, 500)
          } else {
            this.listResultTourPost = this.listResultTourPostTemp;
            this.listResultGroupTour = this.listResultGroupTourTemp;
          }
          break
        }
        case 4: {
          // theo ngày
          this.commonService.searchByDuration(this.textSearch.toLowerCase(), data => {
            let listAll = this.getDataLikeComment(data);
            setTimeout(() => {
              this.listResultTourPost = listAll.filter(item => item.deleted == 0 && item.type == 0);
              this.listResultGroupTour = listAll.filter(item => item.deleted == 0 && item.type == 1);
            }, 250)
          })
          break;
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
