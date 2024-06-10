import { Routes } from '@angular/router';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { JobFormComponent } from './job-form/job-form.component';
import { jobDetailResolver } from './job-details.resolver';

export const routes: Routes = [
  {path: 'jobs-list/:isFavorite', title: 'Jobs list', loadComponent: ()=> JobsListComponent, children: []},
  {path: 'job-detail/:id', title: 'Job detail', loadComponent: ()=> JobFormComponent, resolve: {jobDetail: jobDetailResolver}},
  {path: '**', redirectTo:'jobs-list/false', pathMatch:'full'}
];
