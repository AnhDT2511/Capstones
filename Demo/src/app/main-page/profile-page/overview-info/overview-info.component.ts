import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SystemConstants } from '../../../shared/common';
import { DataService, UtilityService, NotificationService, CommonService } from '../../../shared/service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-overview-info',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './overview-info.component.html',
  styleUrls: ['../profile-page.component.css']
})
export class OverviewInfoComponent implements OnInit {
  listTourPost: any = [];
  listGroupPost: any = [];
  id: any = 0;
  viewPersionInfo : boolean = true;
  constructor(
    private dataService: DataService,
    private utilityService: UtilityService,
    private activatedRoute: ActivatedRoute,

  ) {
  }

  ngOnInit() {
    if(localStorage.getItem('viewPersional') != "true"){
      this.viewPersionInfo = false;
    }
    this.id = localStorage.getItem('userID');
    this.dataService.get('/tours/post/get-all').subscribe((response: any) => {
      response.forEach(element => {
        if (element.accountID === Number(this.id) && element.type == 0) {
          this.listTourPost.push({ 'tourPostID': element.id, 'title': element.tourArticleTitle })
        } else if (element.accountID === Number(this.id) && element.type == 1) {
          this.listGroupPost.push({ 'tourPostID': element.id, 'title': element.tourArticleTitle })
        }
      });
    }, error => {
    });
  }
  updateTourPost(id) {
    this.utilityService.navigate('/main/profile/0/createPost/' + id);
  }
  updateGroupPost(id) {
    this.utilityService.navigate('/main/profile/0/createTour/' + id);
  }
}
