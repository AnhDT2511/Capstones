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
  amount : any = 0 ;
  constructor(
    private dataService : DataService,
    private utilityService : UtilityService
  ) { }

  ngOnInit() {
    this.dataService.get('/tours/post/get-all').subscribe((response: any) => {
        response.forEach(element => {
          if(element.accountID === this.user.id){
            this.listTourPost.push({'tourPostID':element.id,'title':element.tourArticleTitle})
          }
        });
        this.amount = this.listTourPost.length;
    }, error => {
    });
  }
  updateTourPost(id){
    this.utilityService.navigate('/main/profile/createPost/'+ id);
  }
}
