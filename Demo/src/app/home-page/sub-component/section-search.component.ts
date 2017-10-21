import { Component, OnInit } from '@angular/core';
import {ViewEncapsulation} from '@angular/core'

@Component({
    selector: 'app-section-search',
    encapsulation: ViewEncapsulation.None,
    template: `
        <section id="search">
            <div class="col-xs-12 col-sm-2 col-md-2">
            </div>
            <div class="col-xs-12 col-sm-2 col-md-2">
                <i class="fa fa-search" aria-hidden="true" style="font-size: 16px;"></i>
                <input type="text" class="input" name="txtSearch" placeholder=" Nhập từ khóa...">
            </div>
            <div class="col-xs-12 col-sm-2 col-md-2">
                <i class="fa fa-map-marker" aria-hidden="true" style="font-size: 19px;"></i>
                <select class="input">
                    <option>Location</option>
                    <option>2</option>
                    <option>3</option>
                </select>
            </div>
            <div class="col-xs-12 col-sm-2 col-md-2">
                <i class="fa fa-calendar" aria-hidden="true" style="font-size: 16px;"></i>
                <select class="input">
                    <option>Date</option>
                    <option>2</option>
                    <option>3</option>
                </select>
            </div>
            <div class="col-xs-12 col-sm-2 col-md-2">
                <input type="submit" class="btnSearch" name="btnSubmit" value="Tìm kiếm">
            </div>
        </section>
  `,
      styleUrls: ['../home-page.component.css']
})
export class SectionSearchComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
