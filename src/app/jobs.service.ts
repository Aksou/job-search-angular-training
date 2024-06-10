import { Injectable, SecurityContext, Signal, WritableSignal, signal } from '@angular/core';
import { JobsApiService } from './jobs-api.service';
import { Job } from './jobs-list/job.interface';
import { JobDetail } from './job-form/job-detail';
import { Observable, OperatorFunction, map, take, tap } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { JobWithFavorite } from './jobs-list/job-with-favorite.type';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  private readonly _jobsList: WritableSignal<JobWithFavorite[]>;
  constructor(private readonly _jobsApiService: JobsApiService, private readonly _sanitizer: DomSanitizer) {
    this._jobsList = signal([]);
  }

  public findAllJobs(): Observable<JobWithFavorite[]> {
    return this._jobsApiService.findAllJobs().pipe(
      take(1),
      this._retrieveFavorites(),
      tap(jobs=> this._jobsList.set(jobs)));
  }

  private _retrieveFavorites(): OperatorFunction<Job[], JobWithFavorite[]> {
    return map((jobs: Job[]) => (jobs as JobWithFavorite[])
      .map(job => {
        job.isFavorite = localStorage.getItem(String(job.id)) === 'true' ?? false;
        return job;
      }));
  }

  public get allJobs(): Signal<JobWithFavorite[]> {
    return this._jobsList.asReadonly();
  }

  public setFavorite(id: number): void {
    this._jobsList.update(jobs => jobs.map(job => {
      if (job.id === id) {
        job.isFavorite = !job.isFavorite
        job.isFavorite ? localStorage.setItem(String(id), String(true)) : localStorage.removeItem(String(id));
      }
      return job;
    }))
  }

  public findJobById(id: number): Observable<JobDetail | null> {
    return this._jobsApiService.findJobById(id).pipe(tap(job => this._sanitizer.sanitize(SecurityContext.HTML, job?.description ?? '')))
  }
}
