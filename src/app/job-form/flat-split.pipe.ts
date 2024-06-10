import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flatSplit',
  standalone: true
})
export class FlatSplitPipe implements PipeTransform {

  transform(values: string[], separator: string): string[] {
    return values.flatMap((value: string) => value.split(separator));
  }

}
