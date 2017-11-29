import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-main-page',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
  
export class MainPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
