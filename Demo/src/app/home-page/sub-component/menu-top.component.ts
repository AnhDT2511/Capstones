import { Component, OnInit } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
@Component({
    selector: 'app-menu-top',
    
    encapsulation: ViewEncapsulation.None,
    template: `
            <nav id="mainNav" class="navbar navbar-default navbar-fixed-top">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                        <span class="sr-only">Toggle navigation</span><i class="fa fa-bars"></i>
                    </button>
                    <a class="navbar-brand page-scroll" href="#page-top" style="letter-spacing: 2px;">TripNET</a>
                </div>
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav navbar-right">
                        <li>
                            <a class="page-scroll" href="#about">About</a>
                        </li>					
                        <li>
                            <a class="page-scroll" href="#prominent-place">Prominent Place</a>
                        </li>
                        <li>
                            <a class="page-scroll" href="#place">Top Place</a>
                        </li>
                        <li>
                            <a class="page-scroll" href="#contact">Contact</a>
                        </li>
                        <li>
                          <ngbd-modal-basic></ngbd-modal-basic>
                        </li>
                    </ul>
                </div>
            </div>
            </nav>
  `,
      styleUrls: ['../home-page.component.css']
})
export class MenuTopComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
