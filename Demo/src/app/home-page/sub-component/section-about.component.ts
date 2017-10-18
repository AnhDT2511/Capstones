import { Component, OnInit } from '@angular/core';
 import {ViewEncapsulation} from '@angular/core'
@Component({
    selector: 'app-section-about',
    encapsulation: ViewEncapsulation.None,
    template: `
            <section id="about">
            <div class="container-fluid">
                <div class="col-xs-12 col-sm-8 col-md-8">
                    <img src="../../assets/img/about_1.jpg" alt="">			
                    <ul>
                        <li class="description-place">Mù Cang Chải</li>
                        <li>
                            Mù Cang Chải là một huyện vùng cao của tỉnh Yên Bái.
                        </li>
                        <li>
                            Mù Cang Chải nằm cách Hà Nội khoảng 280km, mỗi mùa lúa chín nơi đây đón tiếp hàng nghìn khách từ khắp các miền tổ quốc về thăm.
                        </li>
                    </ul>				
                </div>

                <div class="col-xs-12 col-sm-4 col-md-4">
                    <div class="about-content">
                        <h1><span class="title"><i> About Me </i></span></h1>
                        <div class="arrow-right"></div>
                        <p class="right">
                            <span class="brand"><i> TRIPNET </i></span>
                            Về độ phân giải, 2K (2.560x1.440) nhưng để trên tấm nền 27" thì mật độ điểm ảnh chỉ có 108.79 ppi, khá thấp so với ppi của MacBook 15" Retina (220 ppi). Nếu bạn đang dùng MacBook Retina, điện thoại màn hình cũng siêu nét nữa thì nhìn màn hình này sẽ thấy nó không được sắc nét như những thiết bị còn lại. Font chữ bị rỗ, hình ảnh cũng không nét bằng. Còn nếu bạn đã quen xài màn hình Full-HD, màn hình 2K cùng hệ điều hành Windows thì vấn đề này không nghiêm trọng lắm.
                        </p>
                    </div>
                </div>			
            </div>
        </section>
        `,
      styleUrls: ['../home-page.component.css']
})
export class SectionAboutComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
