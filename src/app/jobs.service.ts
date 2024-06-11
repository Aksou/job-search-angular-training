import { Injectable, SecurityContext, Signal, WritableSignal, signal } from '@angular/core';
import { JobsApiService } from './jobs-api.service';
import { Job } from './jobs-list/job.interface';
import { JobDetail } from './job-form/job-detail';
import { Observable, OperatorFunction, filter, map, tap } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { JobWithFavorite } from './jobs-list/job-with-favorite.type';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  private readonly _jobsList: WritableSignal<JobWithFavorite[]>;
  constructor(private readonly _jobsApiService: JobsApiService, private readonly _sanitizer: DomSanitizer) {
    this._jobsList = signal<JobWithFavorite[]>([]);
  }

  public findAllJobs(): Observable<JobWithFavorite[]> {
    return this._jobsApiService.findAllJobs().pipe(
      this._retrieveFavorites(),
      tap((jobs: JobWithFavorite[])=> this._jobsList.set(jobs)));
  }

  private _retrieveFavorites(): OperatorFunction<Job[], JobWithFavorite[]> {
    return map((jobs: Job[]) => (jobs as JobWithFavorite[])
      .map((job: JobWithFavorite) => {
        job.isFavorite = localStorage.getItem(String(job.id)) === 'true' ?? false;
        return job;
      }));
  }

  public get allJobs(): Signal<JobWithFavorite[]> {
    return this._jobsList.asReadonly();
  }

  public setFavorite(id: number): void {
    this._jobsList.update((jobs: JobWithFavorite[]) => jobs.map(job => {
      if (job.id === id) {
        job.isFavorite = !job.isFavorite
        job.isFavorite ? localStorage.setItem(String(id), String(true)) : localStorage.removeItem(String(id));
      }
      return job;
    }));
  }

  public findJobById(id: number): Observable<JobDetail | null> {
    return this._jobsApiService.findJobById(id).pipe(
      filter((job: JobDetail | null): job is JobDetail => job != null),
      tap((job: JobDetail) => job.description = this._sanitizer.sanitize(SecurityContext.HTML, job?.description ?? '') ?? '')
    );
  }
}
