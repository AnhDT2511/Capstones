import { Routes, RouterModule } from '@angular/router';
import { AdminPageComponent } from './admin-page.component';

const AdminPage_Router: Routes = [
        { path: '', redirectTo: 'index', pathMatch: 'full' },
        { path: 'index', component: AdminPageComponent }
]

export const AdminPageRouter = RouterModule.forChild(AdminPage_Router);