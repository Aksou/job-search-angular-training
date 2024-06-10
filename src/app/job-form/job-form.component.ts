import { Component, Signal, input } from '@angular/core';
import { JobDetail } from '../jobs-api.service';
import { CommonModule, DatePipe, Location } from '@angular/common';
import { FlatSplitPipe } from '../flat-split.pipe';
@Component({
  selector: 'app-job-form',
  standalone: true,
  imports: [DatePipe, CommonModule, FlatSplitPipe],
  templateUrl: './job-form.component.html',
  styleUrl: './job-form.component.css'
})
export class JobFormComponent {
  public jobDetail: Signal<JobDetail | null> = input(null)

  constructor(private readonly _location: Location) {}

  public goBack(): void {
    return this._location.back();
  }
}
