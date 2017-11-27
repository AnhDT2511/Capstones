import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page.component';

const HomePage_Router: Routes = [
    //localhost:4200/main/home
    { path: '',  component: HomePageComponent , pathMatch: 'full' }
]

export const HomePageRouter = RouterModule.forChild(HomePage_Router);