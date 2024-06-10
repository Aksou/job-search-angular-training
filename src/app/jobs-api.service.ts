import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

export interface Job {
  id: number,
  companyName: string,
  title: string,
  companyLogo: string,
  reference: string,
}

export interface JobDetail {
  id: number,
  companyName: string,
  title: string,
  companyLogo: string,
  reference: string,
  location: string,
  industries: string[],
  types: string[],
  description: string,
  publishDate: string,
}

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
