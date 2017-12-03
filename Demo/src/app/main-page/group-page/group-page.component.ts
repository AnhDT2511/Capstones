import { Component, OnInit } from '@angular/core';
import { DataService, UtilityService, NotificationService, CommonService } from '../../shared/service';
import { SystemConstants } from '../../shared/common';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-group-tour',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.css']
})
export class GroupPageComponent implements OnInit {
  
  constructor(
    private dataservice: DataService,
    private utiliservice: UtilityService,
    private notifyservice: NotificationService,
    private commonservice: CommonService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
  }

}
