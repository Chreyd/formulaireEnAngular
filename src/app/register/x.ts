import { AbstractControl } from "@angular/forms";

export function ratingRangeValidator(c: AbstractControl):{ [ key : string] : boolean } | null{

  if(!!c.value && (isNaN(c.value)) || c.value>1 || c.value<5){
    return {'rangeError': true};
  }
  return null;
}
