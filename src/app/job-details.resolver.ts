import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { JobDetail } from './job-form/job-detail';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { JobsService } from './jobs.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

// Find job details by id
export const jobDetailResolver: ResolveFn<Observable<JobDetail | null>> = (activatedRouteSnapshot: ActivatedRouteSnapshot) => {
  return inject(JobsService).findJobById(Number(activatedRouteSnapshot.paramMap.get('id'))).pipe(takeUntilDestroyed());
};
