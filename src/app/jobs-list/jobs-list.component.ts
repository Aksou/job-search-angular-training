import { ChangeDetectionStrategy, Component, OnInit, Signal, input, signal } from '@angular/core';
import { JobWithFavorite, JobsService } from '../jobs.service';
import { CommonModule } from '@angular/common';
import { FavoriteFilterPipe } from '../favorite-filter.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobs-list',
  standalone: true,
  imports: [CommonModule, FavoriteFilterPipe],
  templateUrl: './jobs-list.component.html',
  styleUrl: './jobs-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobsListComponent implements OnInit {
  public jobsList: Signal<JobWithFavorite[]>;
  public isFavorite: Signal<string> = input.required<string>();

  constructor(private readonly _jobService: JobsService, private readonly _router: Router) {
    this.jobsList = signal([]);
  }

  public ngOnInit(): void {
    this.jobsList = this._jobService.allJobs;
  }

  public addOrRemoveFavorite(id: number): void {
    this._jobService.setFavorite(id);
  }

  public trackByJobId(index: number, job: JobWithFavorite): number {
    return job.id;
  }

  public openDetailledJob(id: number): void {
    this._router.navigate(['/job-detail', id])
  }
}
