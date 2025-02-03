import {AbstractControl, FormArray, FormGroup, ValidatorFn} from '@angular/forms';

export function minOneFormGroupValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (!(control instanceof FormArray)) {
      return null;
    }

    const hasNonEmptyFormGroup = control.controls.some((formGroup: AbstractControl) => {
      if (formGroup instanceof FormGroup) {
        return Object.values(formGroup.controls).some(ctrl => !!ctrl.value);
      }
      return false;
    });

    return hasNonEmptyFormGroup ? null : { 'noNonEmptyFormGroup': true };
  };
}
