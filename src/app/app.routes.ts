import { ActivatedRouteSnapshot, ResolveFn, Routes } from '@angular/router';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { JobFormComponent } from './job-form/job-form.component';
import { JobDetail } from './job-form/job-detail';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { JobsService } from './jobs.service';

// Find job details by id
const jobDetailResolver: ResolveFn<Observable<JobDetail | null>> = (activatedRouteSnapshot: ActivatedRouteSnapshot) => {
  return inject(JobsService).findJobById(Number(activatedRouteSnapshot.paramMap.get('id')))
}

export const routes: Routes = [
  {path: 'jobs-list/:isFavorite', title: 'Jobs list', loadComponent: ()=> JobsListComponent, children: []},
  {path: 'job-detail/:id', title: 'Job detail', loadComponent: ()=> JobFormComponent, resolve: {jobDetail: jobDetailResolver}},
  {path: '**', redirectTo:'jobs-list/false', pathMatch:'full'}
];
