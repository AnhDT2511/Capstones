import { Routes, RouterModule } from '@angular/router';
import { TourPostPageComponent } from './tour-post-page.component';

const ProfilePage_Router: Routes = [
    //localhost:4200/main/profile
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index/:id', component: TourPostPageComponent },
]

export const TourPostPageRouter = RouterModule.forChild(ProfilePage_Router);