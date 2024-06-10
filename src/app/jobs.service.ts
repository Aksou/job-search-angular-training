import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { Job, JobsApiService } from './jobs-api.service';
import { Observable, OperatorFunction, map, take, tap } from 'rxjs';

export type JobWithFavorite = Job & {isFavorite: boolean}

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  private readonly _jobsList: WritableSignal<JobWithFavorite[]>;
  constructor(private readonly _jobsApiService: JobsApiService) {
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
}
