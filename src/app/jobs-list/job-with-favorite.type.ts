import { Job } from './job.interface';


export type JobWithFavorite = Job & { isFavorite: boolean; };
