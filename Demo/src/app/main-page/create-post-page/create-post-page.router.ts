import { Routes, RouterModule } from '@angular/router';
import { CreatePostComponent } from './create-post-page.component';

const CreatePostPage_Router: Routes = [
    // localhost:4200/main/profile
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: CreatePostComponent },
];

export const CreatePostPageRouter = RouterModule.forChild(CreatePostPage_Router);
