import { Component, OnInit } from '@angular/core';
import {ViewEncapsulation} from '@angular/core'

@Component({
    selector: 'app-section-cover',
    
    encapsulation: ViewEncapsulation.None,
    template: `
        <section id="cover">
            <div class="fullscreen-video-wrap">
                <video src="../../assets/video/6.mp4" autoplay="true" loop="true"></video>
            </div>
            <div class="overlay"></div>
            <div class="content">
                <div class="container clearfix">
                    <div class="row">
                        <div class="col-md-8 col-md-offset-2 col-sm-12 text-center">
                            <i>{{tittleSub}}</i>
                            <h1 style="font-size: 150px; font-style: italic;">{{titleMain}}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  `,
      styleUrls: ['../home-page.component.css']
})
export class SectionCoverComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

    titleMain : string = "TRIP NET";
    tittleSub : string = "Oh, hello, nice to meet you!";
}
