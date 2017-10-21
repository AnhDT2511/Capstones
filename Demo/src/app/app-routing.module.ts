import { NgModule , ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component'
// import { LoginPageComponent } from './login-page/login-page.component';

const routesConfig: Routes = [
    { path: 'home-page', loadChildren : './home-page/home-page.module#HomePageModule'},
    // { path: 'login', component : LoginPageComponent },
    { path: '', redirectTo: '/home-page', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

const Routing: ModuleWithProviders = RouterModule.forRoot(routesConfig);

@NgModule({
    imports: [
        Routing
    ],
    declarations: [
        PageNotFoundComponent,
    ],
    exports: [RouterModule]
})

export class AppRoutingModule { }
