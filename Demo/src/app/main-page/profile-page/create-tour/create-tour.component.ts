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
  groupTour: any = {};
  place: any = {
    '1': 'Ha'
  }
  id = 0;
  constructor(
    private dataService: DataService,
    private utiliService: UtilityService,
    private notifyService: NotificationService,
    private commonService: CommonService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.groupTour = {};
      this.id = params.id;
      if (params.id != 0) {
        this.dataService.get('/tours/post/' + params.id).subscribe((response: any) => {
          this.groupTour = response;
        console.log(this.groupTour);
        })
      } 
    });
  }

  ngOnInit() {
  }
  showGroupTour() {
    console.log(this.groupTour);
  }
  saveGroupTour() {
    let date = Date.now();
    let _groupTour: TourPost = new TourPost(0, this.user.id, this.groupTour.startPlaceID, this.groupTour.endPlaceID, this.groupTour.duration, this.groupTour.tourArticleTitle, 0,
      date, this.groupTour.description, 0, this.groupTour.note, this.groupTour.prepare, 1, this.groupTour.startTime, this.groupTour.category, this.groupTour.referenceLink);
      console.log(_groupTour);
    if (this.id == 0) {
      this.commonService.createPost(_groupTour, data => {
        this.notifyService.printSuccessMessage("Tạo chuyến đi thành công");
        this.utiliService.navigate('/main/profile/0');
      })
    }else{
      _groupTour.id = this.id;
      this.commonService.updatePost(_groupTour, data => {
        this.notifyService.printSuccessMessage("Cập nhật chuyến đi thành công");
        this.utiliService.navigate('/main/grouptour/' + _groupTour.id);
      })
    }

  }

}
