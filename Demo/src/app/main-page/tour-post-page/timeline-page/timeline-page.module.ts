import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TimeLinePageComponent } from '../timeline-page/timeline-page.component';
import { NgAutoCompleteModule} from "ng-auto-complete";
import { SharedModule } from '../../../shared/shared.module';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgAutoCompleteModule,
        CarouselModule,
        SharedModule
    ],
    declarations: [
        TimeLinePageComponent
    ],
})

export class TimelinePageModule {}