import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPageComponent } from './search-page.component';
import { SearchPageRouter } from './search-page.router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [
      SearchPageRouter,
        CommonModule,
        FormsModule,
        SharedModule
    ],
    declarations: [
      SearchPageComponent
    ]
})

export class SearchPageModule {}