import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule, RouterLink, RouterLinkActive } from '@angular/router';
import { JobsService } from './jobs.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(private readonly _jobsService: JobsService) {}

  public ngOnInit(): void {
    // Load all jobs and set them in the service
    this._jobsService.findAllJobs().subscribe();
  }
}
