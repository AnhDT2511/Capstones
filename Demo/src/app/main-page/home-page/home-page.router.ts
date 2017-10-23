import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page.component';

const HomePage_Router: Routes = [
    //localhost:4200/main/home
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: HomePageComponent },
]

export const HomePageRouter = RouterModule.forChild(HomePage_Router);