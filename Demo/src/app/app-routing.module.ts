import { NgModule , ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component'

const routesConfig: Routes = [
    { path: '', redirectTo: 'main', pathMatch: 'full' },
    { path: 'main', loadChildren : './main-page/main-page.module#MainPageModule'},
    { path: 'login', loadChildren : './login-page/login-page.module#LoginPageModule' },
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
