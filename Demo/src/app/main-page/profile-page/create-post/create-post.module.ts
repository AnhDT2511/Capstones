import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreatePostComponent } from '../create-post/create-post.component';
import {NgAutoCompleteModule} from "ng-auto-complete";
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgAutoCompleteModule,
        SharedModule
    ],
    declarations: [
        CreatePostComponent,
    ],
})

export class CreatePostPageModule {}