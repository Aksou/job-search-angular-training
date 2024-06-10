import { Pipe, PipeTransform } from '@angular/core';
import { JobWithFavorite } from './jobs.service';

@Pipe({
  name: 'favoriteFilter',
  standalone: true
})
export class FavoriteFilterPipe implements PipeTransform {

  transform(jobs: JobWithFavorite[], isFavorite: boolean): JobWithFavorite[] {
    return isFavorite ? jobs.filter((job) => job.isFavorite) : jobs;
  }

}
