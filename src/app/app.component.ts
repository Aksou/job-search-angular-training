import { Component, DestroyRef, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule, RouterLink, RouterLinkActive } from '@angular/router';
import { JobsService } from './jobs.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(private readonly _jobsService: JobsService, private readonly _destroyRef: DestroyRef) {}

  public ngOnInit(): void {
    // Load all jobs and set them in the service signal
    this._jobsService.findAllJobs().pipe(takeUntilDestroyed(this._destroyRef)).subscribe();
  }
}
