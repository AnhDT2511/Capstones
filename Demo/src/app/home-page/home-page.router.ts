import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './home-page.component';
import {LoginPageComponent} from '../login-page/login-page.component';

const HomePage_Router : Routes = [
    {
        path : '', component : HomePageComponent 
    },
    // {
    //     path : 'login', component : LoginPageComponent 
    // }

]

export const HomePageRouter = RouterModule.forChild(HomePage_Router);