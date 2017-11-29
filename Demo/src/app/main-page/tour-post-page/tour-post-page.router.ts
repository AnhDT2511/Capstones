import { Routes, RouterModule } from '@angular/router';
import { TourPostPageComponent } from './tour-post-page.component';

const ProfilePage_Router: Routes = [
    //localhost:4200/main/profile
    { path: '', component: TourPostPageComponent, pathMatch: 'full' }
]

export const TourPostPageRouter = RouterModule.forChild(ProfilePage_Router);