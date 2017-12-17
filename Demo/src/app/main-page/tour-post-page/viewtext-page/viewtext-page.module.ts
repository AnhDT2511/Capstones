import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViewTextPageComponent } from './viewtext-page.component';
import { NgAutoCompleteModule} from "ng-auto-complete";
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgAutoCompleteModule,
        SharedModule
    ],
    declarations: [
        ViewTextPageComponent
    ],
})

export class ViewTextPageModule {}