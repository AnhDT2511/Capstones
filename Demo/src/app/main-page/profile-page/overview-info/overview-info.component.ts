import { Component, OnInit , ViewEncapsulation } from '@angular/core';
import { SystemConstants } from '../../../shared/common';
import { DataService, UtilityService , NotificationService , CommonService} from '../../../shared/service';

@Component({
  selector: 'app-overview-info',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './overview-info.component.html',
  styleUrls: ['../profile-page.component.css']
})
export class OverviewInfoComponent implements OnInit {
  user: any = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
  listTourPost : any = [];  
  listGroupPost : any = [];
  constructor(
    private dataService : DataService,
    private utilityService : UtilityService
  ) { }

  ngOnInit() {
    this.dataService.get('/tours/post/get-all').subscribe((response: any) => {
        response.forEach(element => {
          if(element.accountID === this.user.id && element.type == 0){
            this.listTourPost.push({'tourPostID':element.id,'title':element.tourArticleTitle})
          }else if(element.accountID === this.user.id && element.type == 1){
            this.listGroupPost.push({'tourPostID':element.id,'title':element.tourArticleTitle})
          }
        });
    }, error => {
    });
  }
  updateTourPost(id){
    this.utilityService.navigate('/main/profile/createPost/'+ id);
  }
  updateGroupPost(id){
    this.utilityService.navigate('/main/profile/createTour/'+ id);
  }
}
