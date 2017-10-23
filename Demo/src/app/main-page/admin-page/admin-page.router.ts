import { Routes, RouterModule } from '@angular/router';
import { AdminPageComponent } from './admin-page.component';
import { AdminPageModule } from './admin-page.module';

const AdminPage_Router: Routes = [
        { path: '', redirectTo: 'index', pathMatch: 'full' },
        { path: 'index', component: AdminPageModule }
]

export const AdminPageRouter = RouterModule.forChild(AdminPage_Router);