import { Component, OnInit } from '@angular/core';
import {ViewEncapsulation} from '@angular/core'
@Component({
    selector: 'app-section-place',
    encapsulation: ViewEncapsulation.None,
    template: `
    <section id="place">
        <div class="container-fluid">
            <h1><span class="title"><i class="fa fa-map-marker" aria-hidden="true"></i><i> Top Place </i></span></h1>
            <div class="arrow-right"></div>

            <div class="row">
                <div class="col-sm-3">
                    <div class="thumbnail">
                        <div class="container">
                            <img src="../../assets/img/1.jpg" alt="Avatar" class="image">
                            <div class="overlay">
                                <div class="text">
                                    <p class="start-end-place">
                                        <i class="fa fa-map-marker" aria-hidden="true"></i> Hà Nội
                                        <i class="fa fa-long-arrow-right" aria-hidden="true" style="margin-left: 10px;"></i>
                                        <i class="fa fa-map-marker" aria-hidden="true"></i> Mộc Châu
                                    </p>
                                    <p>
                                        <i class="fa fa-sun-o" aria-hidden="true" style="font-size: 17px;"></i> 3 ngày
                                    </p>
                                    <p class="descreption-place">
                                        <i class="fa fa-slack" aria-hidden="true" style="font-size: 16px;"></i> Ha lo Ha lo Ha Ha lo Ha lo Ha...
                                </div>
                            </div>
                        </div>
                        <a href=""><strong> Pha Luông </strong></a>
                    </div>
                </div>
                <div class="col-sm-3">
                    <div class="thumbnail">
                        <div class="container">
                            <img src="../../assets/img/2.jpg" alt="Avatar" class="image">
                            <div class="overlay">
                                <div class="text">Hello World</div>
                            </div>
                        </div>
                        <strong> Pha Luông </strong>
                    </div>
                </div>
                <div class="col-sm-3">
                    <div class="thumbnail">
                        <div class="container">
                            <img src="../../assets/img/3.jpg" alt="Avatar" class="image">
                            <div class="overlay">
                                <div class="text">Hello World</div>
                            </div>
                        </div>
                        <strong> Pha Luông </strong>
                    </div>
                </div>
                <div class="col-sm-3">
                    <div class="thumbnail">
                        <div class="container">
                            <img src="../../assets/img/4.jpg" alt="Avatar" class="image">
                            <div class="overlay">
                                <div class="text">Hello World</div>
                            </div>
                        </div>
                        <strong> Pha Luông </strong>
                    </div>
                </div>
            </div>

            <h1><span class="title"><i class="fa fa-location-arrow" aria-hidden="true"></i><i> New Place </i></span></h1>
            <div class="arrow-right"></div>

            <div class="row text-center">
                <div class="col-sm-3">
                    <div class="thumbnail">
                        <div class="container">
                            <img src="../../assets/img/4.jpg" alt="Avatar" class="image">
                            <div class="overlay">
                                <div class="text">Hello World</div>
                            </div>
                        </div>
                        <strong> Pha Luông </strong>
                    </div>
                </div>
                <div class="col-sm-3">
                    <div class="thumbnail">
                        <div class="container">
                            <img src="../../assets/img/1.jpg" alt="Avatar" class="image">
                            <div class="overlay">
                                <div class="text">Hello World</div>
                            </div>
                        </div>
                        <strong> Pha Luông </strong>
                    </div>
                </div>
                <div class="col-sm-3">
                    <div class="thumbnail">
                        <div class="container">
                            <img src="../../assets/img/3.jpg" alt="Avatar" class="image">
                            <div class="overlay">
                                <div class="text">Hello World</div>
                            </div>
                        </div>
                        <strong> Pha Luông </strong>
                    </div>
                </div>
                <div class="col-sm-3">
                    <div class="thumbnail">
                        <div class="container">
                            <img src="../../assets/img/2.jpg" alt="Avatar" class="image">
                            <div class="overlay">
                                <div class="text">Hello World</div>
                            </div>
                        </div>
                        <strong> Pha Luông </strong>
                    </div>
                </div>
            </div>
        </div>
    </section>
        `,
      styleUrls: ['../home-page.component.css']
})
export class SectionPlaceComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
