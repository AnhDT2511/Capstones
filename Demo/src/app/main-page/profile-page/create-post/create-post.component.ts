import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DataService, UtilityService, NotificationService, CommonService } from '../../../shared/service';
import { TourPost } from '../../../shared/domain/tourPost.user';
import { SystemConstants, InfoContstants } from '../../../shared/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CreateNewAutocompleteGroup, SelectedAutocompleteItem, NgAutocompleteComponent } from "ng-auto-complete";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  @ViewChild(NgAutocompleteComponent)
  public completer: NgAutocompleteComponent;

  public groupCity = [
    CreateNewAutocompleteGroup(
      'Tỉnh/Thành Phố',
      'completer',
      InfoContstants.CITY_VN,
      { titleKey: 'title', childrenKey: null },
      // '',
      // false
    )
  ];

  user: any = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
  tourPost: any;
  tourPostTemp: any;
  listTourDetail: any;
  listTourDetailTemp: any = [];
  id = 0;
  options = [
    { name: 'motorcycle', value: '1' },
    { name: 'taxi', value: '2' },
    { name: 'bus', value: '3' },
    { name: 'train', value: '4' }
  ]
  constructor(
    private dataservice: DataService,
    private utiliservice: UtilityService,
    private notifyservice: NotificationService,
    private commonservice: CommonService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.tourPost = {};
      this.listTourDetail = [];
      this.id = params.id;

      if (params.id != 0) {
        this.dataservice.get('/tours/post/' + params.id).subscribe((response: any) => {
          this.tourPost = response;
          this.tourPost['title'] = response.tourArticleTitle;
          this.tourPost['descriptionTourPost'] = response.description;
          this.tourPost['prepare'] = response.prepare;
          this.tourPost['note'] = response.note;
          this.tourPostTemp = JSON.parse(JSON.stringify(this.tourPost));
        })
        this.dataservice.get('/tours/post/' + params.id + '/get-all').subscribe((response: any) => {
          response.forEach(element => {
            let splitVehicle = element.vehicle.split(",");
            let objCheckbox = {};
            for (var i = 0; i <= 4; i++) {
              if (splitVehicle.indexOf(i.toString()) != -1) {
                objCheckbox[i] = true;
              }
            }
            this.listTourDetail.push({
              placeID: element.placeID,
              placeDetail: element.placeDetail,
              hotel: element.hotel,
              food: element.food,
              other: element.other == undefined ? null : element.other,
              description: element.description,
              day: element.day,
              checkbox: objCheckbox,
              id: element.id,
              tourPostID: element.tourPostID,
              createTime: element.createTime
            })
            // this.tourPost.placeID != undefined ? this.completer.SelectItem('completer', this.tourPost.placeID) : null;
          });
          this.listTourDetailTemp = JSON.parse(JSON.stringify(this.listTourDetail))
        })
      } else {
        this.tourPost = { 'title': '', 'descriptionTourPost': '', 'prepare': '', 'note': '' };
        this.addMoreDetails();
      }
    });
  }
  // showList() {
  //   console.log(this.listTourDetail);
  // }
  setDisplayValue(tourpost, tourbyday, event) {
    this.listTourDetail[tourpost].checkbox[tourbyday] = event;
  }
  validateTourPost(): boolean {
    for (let i in this.tourPost) {
      switch (i) {
        case 'title':
          if (InfoContstants.isEmpty(this.tourPost[i])) {
            this.notifyservice.printErrorMessage('Ô tiêu đề không nên để trống');
            return false;
          }
          break;
        case 'descriptionTourPost':
          if (InfoContstants.isEmpty(this.tourPost[i])) {
            this.notifyservice.printErrorMessage('Ô miêu tả không nên để trống');
            return false;
          }
          break;
        case 'prepare':
          if (InfoContstants.isEmpty(this.tourPost[i])) {
            this.notifyservice.printErrorMessage('Ô chuẩn bị không nên để trống');
            return false;
          }
          break;
        case 'note':
          if (InfoContstants.isEmpty(this.tourPost[i])) {
            this.notifyservice.printErrorMessage('Ô chú ý không nên để trống');
            return false;
          }
          break;
      }
    }
    if (InfoContstants.isEmpty(this.tourPost) || (JSON.stringify(this.tourPost) == JSON.stringify(this.tourPostTemp) && JSON.stringify(this.listTourDetail) == JSON.stringify(this.listTourDetailTemp))) {
      this.notifyservice.printErrorMessage('Không có dữ liệu nào thay đổi');
      return false;
    }
    if (this.listTourDetail.findIndex(item => item.tourArticleTitle == this.tourPost.title) != -1) {
      return false;
    }
    return true;
  }
  validateTourByDay() {
    // if (JSON.stringify(this.listTourDetail) == JSON.stringify(this.listTourDetailTemp)) {
    //   this.notifyservice.printErrorMessage('Hành trình chi tiết không nên để trống');
    //   return false;
    // }
    this.listTourDetail.forEach(element => {
      for (let i in element) {
        switch (i) {
          case 'hotel':
            if (InfoContstants.isEmpty(element[i])) {
              this.notifyservice.printErrorMessage('**Ngày ' + element.day + '**:Nơi nghỉ không nên để trống');
              return false;
            }
            break;
          case 'food':
            if (InfoContstants.isEmpty(element[i])) {
              this.notifyservice.printErrorMessage('**Ngày ' + element.day + '**:Đồ ăn không nên để trống');
              return false;
            }
            break;
          case 'placeID':
            if (InfoContstants.isEmpty(element[i])) {
              this.notifyservice.printErrorMessage('**Ngày ' + element.day + '**:Địa điểm không nên để trống');
              return false;
            }
            break;
          case 'checkbox':
            let check : boolean = true;
            if (InfoContstants.isEmpty(element[i])) {
              this.notifyservice.printErrorMessage('**Ngày ' + element.day + '**:Phương tiện không nên để trống');
              check = false;
            } else {
              for (let a in element[i]) {
                let value = element[i][a + ""];
                value ? '' : delete element[i][a + ""];
              }
              if (InfoContstants.isEmpty(element[i])) {
                this.notifyservice.printErrorMessage('**Ngày ' + element.day + '**:Phương tiện không nên để trống');
                check = false;
              }
            }
            if(!check){
              return false;
            }
            break;
        }
      }
    });
    return true;
  }
  saveTourPost() {
    let responseID = 0;
    if (this.validateTourPost() && this.validateTourByDay()) {
      this.commonservice.getAllTourPost(data => {
        let date = Date.now();
        let _tourPost: TourPost = new TourPost(0, this.user.id, this.tourPost.startPlaceID, 0, this.listTourDetail.length, this.tourPost.title, 0,
          date, this.tourPost.descriptionTourPost, 0, this.tourPost.note, this.tourPost.prepare, 0, '', 0, '');
        let validate = data.findIndex(item => item.tourArticleTitle.toString() == this.tourPost.title);
        if (this.id == 0 && validate == -1) {
          this.commonservice.createPost(_tourPost, data => {
            this.addTourByDay(data._body);
            this.notifyservice.printSuccessMessage("Tạo bài viết thành công");
          })
        } else if (this.id == 0 && validate != -1) {
          this.notifyservice.printErrorMessage('Tiêu đề đã tồn tại trong hệ thống');
        } 
        else if (this.id != 0) {
          _tourPost.id = this.id;
          this.commonservice.updatePost(_tourPost, data => {
            this.updateTourByDay(this.id);
          })
          this.notifyservice.printSuccessMessage("Cập nhật bài viết thành công");
        }
      })
    }
  }
  addTourByDay(id) {
    for (let i = 0; i < this.listTourDetail.length; i++) {
      let listVehicle = this.listTourDetail[i].checkbox;
      this.listTourDetail[i]['vehicle'] = this.getKeyByValue(listVehicle, true).substring(0, this.getKeyByValue(listVehicle, true).length - 1);
      this.listTourDetail[i]['tourPostID'] = id;
      this.dataservice.post('/tours/post/' + id + '/day', this.listTourDetail[i]).subscribe((response: any) => {
      }, error => {
      });;
    }
  }
  updateTourByDay(id) {
    for (let i = 0; i < this.listTourDetail.length; i++) {
      let listVehicle = this.listTourDetail[i].checkbox;
      this.listTourDetail[i]['vehicle'] = this.getKeyByValue(listVehicle, true).substring(0, this.getKeyByValue(listVehicle, true).length - 1);
      this.listTourDetail[i]['updatedTime'] = Date.now();
      this.dataservice.put('/tours/post/' + id + '/day', this.listTourDetail[i]).subscribe((response: any) => {
      }, error => {
      });;
    }
  }
  deleteTourPost() {
    this.notifyservice.printConfirmationDialog('Bạn có chắc chắn muốn xóa bài viết này!', () => {
      this.tourPost.deleted = 1;
      this.commonservice.updatePost(this.tourPost, data => {
        this.utiliservice.navigate('/main/profile/0');
      })
    });
  }
  addMoreDetails() {
    this.listTourDetail.push({
      checkbox: {}, day: this.listTourDetail.length + 1,
      deleted: 0, createTime: Date.now(), placeID: '', hotel: '', food: ''
    });
    this.listTourDetailTemp = JSON.parse(JSON.stringify(this.listTourDetail));
  }

  getKeyByValue(object, value) {
    let stringVehicle = "";
    Object.keys(object).filter(key => object[key] === value).forEach(element => {
      if (element != undefined) {
        stringVehicle += element + ",";
      }
    });
    return stringVehicle;
  }

  Selected(item: SelectedAutocompleteItem, tourDetail) {
    tourDetail.placeID = item.item.id;
  }

  ngOnInit() {
  }

}
