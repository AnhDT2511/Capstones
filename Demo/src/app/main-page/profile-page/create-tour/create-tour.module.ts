import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateTourComponent } from '../create-tour/create-tour.component';
import { NgAutoCompleteModule } from "ng-auto-complete";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgAutoCompleteModule
    ],
    declarations: [
        CreateTourComponent
    ],
})

export class CreateTourPageModule {}