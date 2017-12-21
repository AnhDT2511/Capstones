import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DataService, UtilityService, NotificationService, CommonService } from '../../../shared/service';
import { TourPost } from '../../../shared/domain/tourPost.user';
import { SystemConstants, InfoContstants } from '../../../shared/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CreateNewAutocompleteGroup, SelectedAutocompleteItem, NgAutocompleteComponent } from "ng-auto-complete";
import { FormUploadComponent } from '../../../shared/form-upload/form-upload.component';

@Component({
  selector: 'app-create-post',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  @ViewChild(NgAutocompleteComponent)
  public completer: NgAutocompleteComponent;

  @ViewChild(FormUploadComponent)
  private formUpload: FormUploadComponent;

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
  tourPostTemp: any = {};
  listTourDetail: any;
  listTourDetailTemp: any = [];
  listImage: any = [];
  resultImage: any = [];
  id = 0;
  changeText: boolean = false;
  listCategory : any = InfoContstants.CATEGORY;
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
        this.changeText = true;
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
            let splitVehicle = element.vehicle != null ? element.vehicle.split(",") : "";
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
              createTime: element.createTime,
              deleted: element.deleted,
            })
            // this.tourPost.placeID != undefined ? this.completer.SelectItem('completer', this.tourPost.placeID) : null;
          });
          this.listTourDetailTemp = JSON.parse(JSON.stringify(this.listTourDetail))
        })
      } else {
        this.changeText = false;
        this.tourPost = { 'title': '', 'descriptionTourPost': '', 'prepare': '', 'note': '' };
        this.addMoreDetails();
      }
    });
  }

  viewTourPost(_tourPost) {
    this.utiliservice.navigate('/main/tourpost/' + _tourPost.id)
  }
  setDisplayValue(tourpost, tourbyday, event) {
    this.listTourDetail[tourpost].checkbox[tourbyday] = event;
  }
  getListImage(ImageName, tourByDayID) {
    this.listImage.filter(item => item.day == tourByDayID.day).forEach(element => {
      this.listImage.splice(this.listImage.findIndex(item => item == element), 1);
    });
    for (let i = 0; i < ImageName.length; i++) {
      if (this.listImage.findIndex(item => item.name == ImageName[i].name && item.day == tourByDayID.day) == -1) {
        this.listImage.push({
          'day': tourByDayID.day,
          'name': ImageName[i].name,
          'image': ImageName[i]
        })
      }
    }
  }

  uploadImage() {
    // let listDataImage : any = [];
    // this.listImage.filter(item => item.day == day).forEach(element => {
    //     listDataImage.push(element['image']);
    // });
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
    if (this.listImage.length == 0 && (JSON.stringify(this.tourPost) == JSON.stringify(this.tourPostTemp) && JSON.stringify(this.listTourDetail) == JSON.stringify(this.listTourDetailTemp))) {
      this.notifyservice.printErrorMessage('Không có dữ liệu nào thay đổi');
      return false;
    }
    if (this.listTourDetail.findIndex(item => item.tourArticleTitle == this.tourPost.title) != -1) {
      return false;
    }
    return true;
  }
  filterItemsOfType(type) {
    return this.listTourDetail.filter(x => x.deleted == type);
  }
  validateTourByDay() {
    let check = true;
    let nullTourDetail = {
      checkbox: {}, day: this.listTourDetail.length + 1,
      deleted: 0, createTime: Date.now(), placeID: '', hotel: '', food: ''
    };
    this.listTourDetail.forEach(element => {
      if (JSON.stringify(element) == JSON.stringify(nullTourDetail)) {
        this.notifyservice.printErrorMessage('Hành trình chi tiết không nên để trống');
        return false;
      }
    });
    // let index = this.listTourDetail.findIndex(item => JSON.stringify(item.checkbox) === "{}")
    // if (index != -1) {
    //   this.notifyservice.printErrorMessage('**Ngày ' + (index + 1) + '**:Phương tiện không nên để trống');
    //   return false;
    // }
    this.listTourDetail.forEach(element => {
      for (let i in element) {
        switch (i) {
          case 'placeID':
            if (element[i] == "") {
              this.notifyservice.printErrorMessage('**Ngày ' + element.day + '**:Tỉnh/Thành Phố không nên để trống');
              check = false;
            }
            break;
          case 'hotel':
            if (element[i] == "") {
              this.notifyservice.printErrorMessage('**Ngày ' + element.day + '**:Nơi nghỉ không nên để trống');
              check = false;
            }
            break;
          case 'food':
            if (element[i] == "") {
              this.notifyservice.printErrorMessage('**Ngày ' + element.day + '**:Đồ ăn không nên để trống');
              check = false;
            }
            break;
          case 'checkbox':
            if (JSON.stringify(element[i]) === "{}") {
              this.notifyservice.printErrorMessage('**Ngày ' + element.day + '**:Phương tiện không nên để trống');
              check = false;
            }
            break;
        }
      }
    });
    if (check) {
      return true;
    }
  }
  saveTourPost() {
    let responseID = 0;
    if (this.validateTourPost() && this.validateTourByDay()) {
      this.commonservice.getAllTourPost(data => {
        let date = Date.now();
        let _tourPost: TourPost = new TourPost(0, this.user.id, this.tourPost.startPlaceID, 0, this.listTourDetail.length, this.tourPost.title, 0,
          date, this.tourPost.descriptionTourPost, 0, this.tourPost.note, this.tourPost.prepare, 0, '', this.tourPost.category, '');
        let validate = data.findIndex(item => item.tourArticleTitle != null && item.tourArticleTitle.toString() == this.tourPost.title);
        if (this.id == 0 && validate == -1) {
          this.commonservice.createPost(JSON.stringify(_tourPost), data => {
            this.addTourByDay(data._body);
            this.notifyservice.printSuccessMessage("Tạo bài viết thành công");
            this.tourPost['id'] = data._body;
            this.utiliservice.navigate('/main/profile/0/overview');
          })
        } else if (this.id == 0 && validate  != -1) {
          this.notifyservice.printErrorMessage('Tiêu đề đã tồn tại trong hệ thống');
        }
        else if (this.id != 0) {
          _tourPost.id = this.id;
          this.commonservice.updatePost(_tourPost, data => {
            this.updateTourByDay(this.id);
          })
          this.notifyservice.printSuccessMessage("Cập nhật bài viết thành công");
          this.utiliservice.navigate('/main/profile/0/overview');
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
        let listDataImage = [];
        this.listImage.filter(item => item.day == i + 1).forEach(element => {
          listDataImage.push(element['image']);
        });
        this.resultImage = this.formUpload.upload(listDataImage, response._body);
      }, error => {
      });;
    }
    setTimeout(() => {
      this.resultImage.forEach(element => {
        this.commonservice.addImage({
          'name': element,
          'accountID': this.user.id,
          'tourByDayID': element.split('_')[2],
          'createdTime': Date.now(),
          'tourPostID': id,
        }, data => {
        })
      });
      this.listImage = [];
    }, 500);
  }

  updateTourByDay(id) {
    for (let i = 0; i < this.listTourDetail.length; i++) {
      let listVehicle = this.listTourDetail[i].checkbox;
      this.listTourDetail[i]['vehicle'] = this.getKeyByValue(listVehicle, true).substring(0, this.getKeyByValue(listVehicle, true).length - 1);
      this.listTourDetail[i]['updatedTime'] = Date.now();
      if (this.listTourDetail[i]['id'] != undefined) {
        this.dataservice.put('/tours/post/' + id + '/day', this.listTourDetail[i]).subscribe((response: any) => {
        }, error => {
        });;
      } else {
        this.listTourDetail[i]['tourPostID'] = id;
        this.dataservice.post('/tours/post/' + id + '/day', this.listTourDetail[i]).subscribe((response: any) => {
          this.listTourDetail[i]['id'] = response._body;
        }, error => {
        });;
      }
      setTimeout(() => {
        let listDataImage = [];
        this.listImage.filter(item => item.day == i + 1).forEach(element => {
          listDataImage.push(element['image']);
          this.commonservice.getImageByTourByDayID(this.listTourDetail[i].id, data => {
            data.forEach(element => {
              let item = element;
              item.deleted = 1;
              this.commonservice.updateImage(item, data => {
              })
            });
          })
        });
        this.resultImage = this.formUpload.upload(listDataImage, this.listTourDetail[i].id);
      }, 150)
    }
    setTimeout(() => {
      this.resultImage.forEach(element => {
        this.commonservice.addImage({
          'name': element,
          'accountID': this.user.id,
          'tourByDayID': element.split('_')[2],
          'tourPostID': id,
          'createdTime': Date.now()
        }, data => {
        })
      });
    }, 300);
  }

  deleteTourPost() {
    this.notifyservice.printConfirmationDialog('Dữ liệu bạn vừa nhập sẽ bị mất khi thực hiện hành động này!', () => {
      this.listTourDetail = JSON.parse(JSON.stringify(this.listTourDetailTemp));
      // console.log(this.tourPostTemp);
      this.tourPost = JSON.parse(JSON.stringify(this.tourPostTemp));
    });
  }

  addMoreDetails() {
    this.listTourDetail.push({
      checkbox: {}, day: this.listTourDetail.length + 1,
      deleted: 0, createTime: Date.now(), placeID: '', hotel: '', food: ''
    });
    this.listTourDetailTemp = JSON.parse(JSON.stringify(this.listTourDetail));
  }

  removeDetails(item) {
    this.notifyservice.printConfirmationDialog('Bạn có chắc chắn muốn xóa dữ liệu ngày này!', () => {
      this.listTourDetail.find(i => i.id == item.id).deleted = 1;
    });
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
