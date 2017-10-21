import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// import { LoginPageComponent } from './login-page/login-page.component';

const routesConfig: Routes = [
    { path: 'home-page', loadChildren : './home-page/home-page.module#HomePageModule'},
    // { path: 'login', component : LoginPageComponent },
    { path: '', redirectTo: '/home-page', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routesConfig),
    ],
    declarations: [
        PageNotFoundComponent,
    ],
    exports: [RouterModule]
})

export class AppRoutingModule { }
