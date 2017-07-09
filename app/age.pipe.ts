import { Pipe, PipeTransform } from '@angular/core';
import { Animal } from './animal.model';

@Pipe({
  name: "maturity",
  pure: false
})

export class AgePipe implements PipeTransform {

  transform(input: Animal[], desiredMaturity) {
    var output: Animal[] = [];
    if(desiredMaturity === "animalsUnderTwo") {
      for (var i = 0; i < input.length; i++) {
        if (input[i].age < 2) {
          output.push(input[i]);
        }
      }
      return output;
    } else if (desiredMaturity === "animalsTwoOrOlder") {
      for (var i = 0; i < input.length; i++) {
        if (input[i].age >= 2) {
          output.push(input[i]);
        }
      }
      return output;
    } else {
      for (var i = 0 ; i < input.length; i++) {
        output.push(input[i]);
      return input;
      }
    }
  }
}
