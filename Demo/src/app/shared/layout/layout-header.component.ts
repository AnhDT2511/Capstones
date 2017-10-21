import { Component, OnInit } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
// import {LayoutFooterComponent} from './layout-footer.component'

@Component({
    selector: 'app-layout-header',
    
    encapsulation: ViewEncapsulation.None,
    templateUrl:'./layout-header.component.html'
})
export class LayoutHeaderComponent implements OnInit {

    constructor(
        private ngbModal: NgbModal
    ) { 
    }

    ngOnInit() {
    }

//     openRegister(){
//     const modalReg = this.ngbModal.open(LayoutFooterComponent);
//    }

}
