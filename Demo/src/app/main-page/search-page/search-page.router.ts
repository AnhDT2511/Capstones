import { Routes, RouterModule } from '@angular/router';
import { SearchPageComponent } from './search-page.component';
const SearchPage_Router: Routes = [
    // localhost:4200/main/profile
    {
        path: '', component: SearchPageComponent
        // children: [
        //     { path: '', redirectTo: 'overview', pathMatch: 'full' },
        //     { path: 'overview', component: OverviewInfoComponent },
        //     { path: 'createPost', component: CreatePostComponent },
        // ]
    },
]

export const SearchPageRouter = RouterModule.forChild(SearchPage_Router);