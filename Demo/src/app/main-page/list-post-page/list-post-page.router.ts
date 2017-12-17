import { Routes, RouterModule } from '@angular/router';
import { ListPostPageComponent } from './list-post-page.component';
const ListPostPage_Router: Routes = [
    // localhost:4200/main/profile
    {
        path: '', component: ListPostPageComponent,
        // children: [
        //     { path: '', redirectTo: 'overview', pathMatch: 'full' },
          
        // ]
    },
]

export const ListPostPageRouter = RouterModule.forChild(ListPostPage_Router);