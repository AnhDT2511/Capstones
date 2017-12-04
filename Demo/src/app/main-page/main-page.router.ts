import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page.component';
import { AuthGuard } from '../shared/guards/auth.guard';

const MainPage_Router: Routes = [
    {
        path: '', component: MainPageComponent, children: [
            // localhost:4200/main
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            // localhost:4200/main/home
            { path: 'home', loadChildren: './home-page/home-page.module#HomePageModule' },
            // localhost:4200/main/tourpost
            { path: 'tourpost/:id', loadChildren: './tour-post-page/tour-post-page.module#TourPostPageModule' },
            // localhost:4200/main/admin
            { path: 'admin', loadChildren: './admin-page/admin-page.module#AdminPageModule', canActivate : [AuthGuard] },
            // localhost:4200/main/profile 
            { path: 'profile', loadChildren: './profile-page/profile-page.module#ProfilePageModule', canActivate : [AuthGuard] },
            // localhost:4200/main/search
            { path: 'search', loadChildren: './search-page/search-page.module#SearchPageModule' },
            // localhost:4200/main/listpost
            { path: 'listpost', loadChildren: './list-post-page/list-post-page.module#ListPostPageModule' },
            // localhost:4200/main/grouptour
            { path: 'grouptour/:id', loadChildren: './group-page/group-page.module#GroupPageModule' }
        ]
        // path : '' , component : MainPageComponent
    }
];

export const MainPageRouter = RouterModule.forChild(MainPage_Router);
