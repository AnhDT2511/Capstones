import { Component, OnInit } from '@angular/core';
import {ViewEncapsulation} from '@angular/core'
@Component({
    selector: 'app-section-prominent-place',
    encapsulation: ViewEncapsulation.None,
    template: `
    <section id="prominent-place">
        <div class="container-fluid">
            <div class="col-xs-12 col-sm-6 col-md-6 left">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6 right">
            </div>
        </div>
    </section>
        `,
      styleUrls: ['../home-page.component.css']
})
export class SectionProminentPlaceComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
