import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UtilityComponent } from './utility-page.componet';

export const routes: Routes = [
  //localhost:4200/login
  { path: '', component: UtilityComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UtilityComponent]
})
export class UtilityPageModule { }