import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page.component';
// import { SearchPageComponent } from './search-page/search-page.component'

const HomePage_Router: Routes = [
    {
        path: '', component: HomePageComponent, children: [
            // { path: '', redirectTo: 'searchresult', pathMatch: 'full' },
            // { path: 'searchresult', component: SearchPageComponent }
        ]
    }
];

export const HomePageRouter = RouterModule.forChild(HomePage_Router); 