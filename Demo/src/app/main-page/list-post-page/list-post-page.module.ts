import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPostPageComponent } from './list-post-page.component';
import { ListPostPageRouter } from './list-post-page.router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [
        ListPostPageRouter,
        CommonModule,
        FormsModule,
        SharedModule
    ],
    declarations: [
        ListPostPageComponent
    ]
})

export class ListPostPageModule {}