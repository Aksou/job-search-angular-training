import { Component, Signal, input } from '@angular/core';
import { JobDetail } from './job-detail';
import { CommonModule, DatePipe, Location } from '@angular/common';
import { FlatSplitPipe } from './flat-split.pipe';
@Component({
  selector: 'app-job-form',
  standalone: true,
  imports: [DatePipe, CommonModule, FlatSplitPipe],
  templateUrl: './job-form.component.html',
  styleUrl: './job-form.component.css'
})
export class JobFormComponent {
  public jobDetail: Signal<JobDetail | null> = input<JobDetail | null>(null)

  constructor(private readonly _location: Location) {}

  public goBack(): void {
    this._location.back();
  }
}
