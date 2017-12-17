import { Routes, RouterModule } from '@angular/router';
import { TourPostPageComponent } from './tour-post-page.component';
import { ViewTextPageComponent } from './viewtext-page/viewtext-page.component';
import { TimeLinePageComponent } from './timeline-page/timeline-page.component';
// import { View } from './viewtext-page/viewtext-page.component';

const TourPostPage_Router: Routes = [
    {
        path: '', component: TourPostPageComponent,
        children: [
            { path: '',  component: TimeLinePageComponent, pathMatch: 'full' },
            { path: 'text/:id', component: ViewTextPageComponent },
        ]
    }
]

export const TourPostPageRouter = RouterModule.forChild(TourPostPage_Router);

