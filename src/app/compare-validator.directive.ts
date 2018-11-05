import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Condition } from 'selenium-webdriver';


@Directive({
  selector: '[compare]'
})
export class CompareValidatorDirective implements Validator {

  @Input('compare') controlNameToCompare: string;
  constructor() { }

  validate(c: AbstractControl): ValidationErrors | null {
    const controlToCompare = c.root.get(this.controlNameToCompare);
    if (controlToCompare) {

    }
    return
  }

}
