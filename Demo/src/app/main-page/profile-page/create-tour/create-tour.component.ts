import { Component, OnInit } from '@angular/core';
import { DataService, UtilityService, NotificationService, CommonService } from '../../../shared/service';
import { TourPost } from '../../../shared/domain/tourPost.user';
import { SystemConstants } from '../../../shared/common';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-create-tour',
  templateUrl: './create-tour.component.html',
  styleUrls: ['./create-tour.component.css']
})
export class CreateTourComponent implements OnInit {
    
  user: any = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
  tourPost: any ;
  listTourDetail: any;
  id = 0 ;
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
    // this.activatedRoute.params.subscribe((params: Params) => {
    //   this.tourPost = {};
    //   this.listTourDetail = [];
    //   this.id = params.id;
    //   if (params.id != 0) {
    //     this.dataservice.get('/tours/post/' + params.id).subscribe((response: any) => {
    //       this.tourPost['title'] = response.tourArticleTitle;
    //       this.tourPost['descriptionTourPost'] = response.description;
    //       this.tourPost['prepare'] = response.prepare;
    //       this.tourPost['note'] = response.note;
    //     })
    //     this.dataservice.get('/tours/post/' + params.id + '/get-all').subscribe((response: any) => {
    //       response.forEach(element => {
    //         let splitVehicle = element.vehicle.split(",");
    //         let objCheckbox  = {};
    //         for(var i = 0 ; i <= 4 ; i++){
    //           if(splitVehicle.indexOf(i.toString()) != -1){
    //             objCheckbox[i] = true;
    //           }
    //         }
    //         this.listTourDetail.push({
    //           placeID : element.placeID,
    //           placeDetail : element.placeDetail,
    //           hotel : element.hotel,
    //           food : element.food,
    //           other : element.other,
    //           description : element.description,
    //           day : element.day,
    //           checkbox : objCheckbox,
    //           id : element.id,
    //           tourPostID : element.tourPostID,
    //           createTime : element.createTime
    //         })
    //       });
    //     })
    //   } else {
    //     this.addMoreDetails();
    //   }
    // });
  }
  // showList() {
  //   console.log(this.listTourDetail);
  // }
//   setDisplayValue(tourpost,tourbyday,event){
//     this.listTourDetail[tourpost].checkbox[tourbyday] = event;
//   }
//   saveTourPost() {
//     let date = Date.now();
//     let _tourPost: TourPost = new TourPost(0, this.user.id, 0, 0, 0, this.tourPost.title, 0,
//       date, this.tourPost.descriptionTourPost, 0, this.tourPost.note, this.tourPost.prepare);
//     this.commonservice.createPost(_tourPost, data => {
//       let responseID = 0;
//       responseID = data._body;
//       if (responseID != 0) {
//         for (let i = 0; i < this.listTourDetail.length; i++) {
//           let listVehicle = this.listTourDetail[i].checkbox;
//           this.listTourDetail[i]['vehicle'] = this.getKeyByValue(listVehicle, true).substring(0, this.getKeyByValue(listVehicle, true).length - 1);
//           this.listTourDetail[i]['tourPostID'] = responseID;
//           this.dataservice.post('/tours/post/' + responseID + '/day', this.listTourDetail[i]).subscribe((response: any) => {
//           }, error => {
//           });;
//         }
//         this.notifyservice.printSuccessMessage("Tạo bài viết thành công");
//         this.utiliservice.navigate('/main/profile');
//       } else if(this.id == 0) {
//         this.notifyservice.printErrorMessage("Tên bài viết đã tồn tại trong hệ thống, vui lòng thử lại!!");
//       }else{
//         for (let i = 0; i < this.listTourDetail.length; i++) {
//           let listVehicle = this.listTourDetail[i].checkbox;
//           this.listTourDetail[i]['vehicle'] = this.getKeyByValue(listVehicle, true).substring(0, this.getKeyByValue(listVehicle, true).length - 1);
//           this.listTourDetail[i]['updated_time'] = Date.now();
//           this.dataservice.put('/tours/post/' + this.id + '/day', this.listTourDetail[i]).subscribe((response: any) => {
//           }, error => {
//           });;
//         }
//         this.notifyservice.printSuccessMessage("Cập nhật bài viết thành công");
//         this.utiliservice.navigate('/main/profile');
//       }
//     })
//   }

//   addMoreDetails() {
//     this.listTourDetail.push({
//       checkbox: {}, day: this.listTourDetail.length + 1,
//       deleted: 0, createTime: Date.now()
//     });
//   }

//   getKeyByValue(object, value) {
//     let stringVehicle = "";
//     Object.keys(object).filter(key => object[key] === value).forEach(element => {
//       if (element != undefined) {
//         stringVehicle += element + ",";
//       }
//     });
//     return stringVehicle;
//   }

  ngOnInit() {
  }

}
