import { Component, OnInit , ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-overview-info',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './overview-info.component.html',
  styleUrls: ['../profile-page.component.css']
})
export class OverviewInfoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
