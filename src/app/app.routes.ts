import { ActivatedRouteSnapshot, ResolveFn, Routes } from '@angular/router';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { JobFormComponent } from './job-form/job-form.component';
import { JobDetail, JobsApiService } from './jobs-api.service';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

// Find job details by id
const jobDetailResolver: ResolveFn<Observable<JobDetail | null>> = (activatedRouteSnapshot: ActivatedRouteSnapshot) => {
  return inject(JobsApiService).findJobById(Number(activatedRouteSnapshot.paramMap.get('id')))
}

export const routes: Routes = [
  {path: 'jobs-list/:isFavorite', loadComponent: ()=> JobsListComponent},
  {path: 'job-detail/:id', loadComponent: ()=> JobFormComponent, resolve: {jobDetail: jobDetailResolver}},
  {path: '**', redirectTo:'jobs-list/false', pathMatch:'full'}
];
