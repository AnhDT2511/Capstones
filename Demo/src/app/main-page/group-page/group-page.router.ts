import { Routes, RouterModule } from '@angular/router';
import { GroupPageComponent } from './group-page.component';

const GroupPage_Router: Routes = [
    // localhost:4200/main/profile
    {
        path: '', component: GroupPageComponent
        // children: [
        //     { path: '', redirectTo: 'overview', pathMatch: 'full' },
        //     { path: 'overview', component: OverviewInfoComponent },
        //     { path: 'createPost/:id', component: CreatePostComponent },
        //     { path: 'createTour', component: CreateTourComponent }
        // ]
    },
]

export const GroupPageRouter = RouterModule.forChild(GroupPage_Router);