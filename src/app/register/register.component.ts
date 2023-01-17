import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { User } from './user';
// import { ratingRangeValidator } from './x';

function ratingRangeValidator( min: number, max: number): ValidatorFn{
  return (c: AbstractControl): { [key: string]: boolean } | null =>{

    if (c.value != null && (isNaN(c.value) || c.value < min || c.value > max)) {
      return { 'rangeError': true };
    }
    return null;

  };
}

function emailMatcher(c: AbstractControl):{ [ key : string] : boolean } | null{

  const emailControl = c.get('email');
  const confirmEmailControl = c.get('confirmEmail');

  if(emailControl?.pristine|| confirmEmailControl?.pristine){
    return null;
  }
  if(emailControl?.value===confirmEmailControl?.value){
    return null;
  }
  return {'match': true};
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;

  public user: User = new User();
  public saveData() {
    console.log(this.registerForm);
    console.log('object', JSON.stringify(this.registerForm?.value));
  }

  public setNotificationSetting(method: string): void {
    const phoneControl = this.registerForm.get('phone');

    if (method == 'texte') {
      phoneControl?.setValidators(Validators.required);
    } else {
      phoneControl?.clearValidators();
    }

    phoneControl?.updateValueAndValidity();
  }

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.registerForm = this.fb.record({
      firstName: ['', [Validators.required, Validators.maxLength(10)]],
      lastName: ['', [Validators.required, Validators.minLength(4)]],
      phone: '',
      rating: [null, ratingRangeValidator(1,5)],
      notification: 'email',
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail:['',[Validators.required]],
      },
      {validators: emailMatcher}),
      sendCatalog: false,
    });

    /*     this.registerForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      sendCatalog: new FormControl(true),
    }); */
  }

  public fillFormData(): void {
    this.registerForm.patchValue({
      firstName: 'Chreyd',
      lastName: 'BPloop',
      email: 'chre@tset.com',
      sendCatalog: true,
    });
    /*     this.registerForm.patchValue({
      firstName: 'Chreyd',
      lastName: 'BPloop',
      email: "chre@tset.com",
      sendCatalog: true,
    }) */
  }
}
