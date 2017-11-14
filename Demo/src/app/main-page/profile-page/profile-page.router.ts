import { Routes, RouterModule } from '@angular/router';
import { ProfilePageComponent } from './profile-page.component';

const ProfilePage_Router: Routes = [
    // localhost:4200/main/profile
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: ProfilePageComponent },
]

export const ProfilePageRouter = RouterModule.forChild(ProfilePage_Router);