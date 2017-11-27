import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverviewInfoComponent } from '../overview-info/overview-info.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [
        OverviewInfoComponent
    ],
})

export class OverViewPageModule {}