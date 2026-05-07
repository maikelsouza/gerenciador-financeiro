import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customKeyValue',
  pure: false
})
export class CustomKeyvaluePipe implements PipeTransform {

  transform(obj: Record<string, unknown>): {key: string; value: unknown}[] {
    return Object.keys(obj).map(key => {
      return { 
        key,
        value: obj[key]};
    });    
  }

}
