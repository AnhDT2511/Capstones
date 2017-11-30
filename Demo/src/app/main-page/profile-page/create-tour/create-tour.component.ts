import { Component, OnInit } from '@angular/core';
import { DataService, UtilityService, NotificationService, CommonService } from '../../../shared/service';
import { SystemConstants } from '../../../shared/common';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-create-tour',
  templateUrl: './create-tour.component.html',
  styleUrls: ['./create-tour.component.css']
})
export class CreateTourComponent implements OnInit {
  user: any = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
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
