import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { JobDetail } from './job-form/job-detail';
import { Job } from './jobs-list/job.interface';

@Injectable({
  providedIn: 'root'
})
export class JobsApiService {

  constructor(private readonly _httpClient: HttpClient) {}

  public findAllJobs(): Observable<Job[]> {
    return this._httpClient.get<Job[]>('/jobs').pipe(
      catchError(_ => of([]))
    );
  }

  public findJobById(id: number): Observable<JobDetail | null> {
    return this._httpClient.get<JobDetail>('/jobs/'+id).pipe(
      catchError(_ => of(null))
    );
  }
}
