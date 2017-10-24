import { NgModule , ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component'

const routesConfig: Routes = [
    { path: '', redirectTo: 'main', pathMatch: 'full' },
    { path: 'main', loadChildren : './main-page/main-page.module#MainPageModule'},
    { path: 'login', loadChildren : './login-page/login-page.module#LoginPageModule' },
    { path: 'register', loadChildren : './register-page/register-page.module#RegisterPageModule' },
    { path: 'forgetpassword', loadChildren : './forget-password-page/forget-password-page.module#ForgetPasswordPageModule' },
    { path: 'utility', loadChildren : './utility-page/utility-page.module#UtilityPageModule' },
    { path: 'admin', loadChildren : './main-page/admin-page/admin-page.module#AdminPageModule' },
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
