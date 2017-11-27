import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-main-page',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
  
export class MainPageComponent implements OnInit {

  // settings = {
  //   columns: {
  //     id: {
  //       title: 'ID'
  //     },
  //     name: {
  //       title: 'Full Name'
  //     },
  //     username: {
  //       title: 'User Name'
  //     },
  //     email: {
  //       title: 'Email'
  //     }
  //   }
  // };

  constructor() { }

  ngOnInit() {
  }

}
