import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'split',
  standalone: true
})
export class SplitPipe implements PipeTransform {

  transform(values: string[], separator: string): string[] {
    return values.flatMap(value => value.split(separator));
  }

}
