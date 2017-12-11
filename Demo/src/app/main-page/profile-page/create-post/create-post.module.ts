import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreatePostComponent } from '../create-post/create-post.component';
import {NgAutoCompleteModule} from "ng-auto-complete";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgAutoCompleteModule
    ],
    declarations: [
        CreatePostComponent,
    ],
})

export class CreatePostPageModule {}