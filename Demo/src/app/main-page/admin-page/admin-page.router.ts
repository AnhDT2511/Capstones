import { Routes, RouterModule } from '@angular/router';
import { AdminPageComponent } from './admin-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { UserManagementPageComponent } from './user-management-page/user-management-page.component';
import { PostManagementPageComponent } from './post-management-page/post-management-page.component';
import { TourManagementPageComponent } from './tour-management-page/tour-management-page.component';
import { ReportManagementPageComponent } from './report-management-page/report-management-page.component';

const AdminPage_Router: Routes = [
        {
                path: '', component: AdminPageComponent, children: [

                        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
                        // tslint:disable-next-line:max-line-length
                        { path: 'dashboard', component : DashboardPageComponent },                        
                        { path: 'usermanagement', component : UserManagementPageComponent },
                        { path: 'postmanagement', component : PostManagementPageComponent },
                        { path: 'reportmanagement', component : ReportManagementPageComponent }
                ]
        }
];

export const AdminPageRouter = RouterModule.forChild(AdminPage_Router);