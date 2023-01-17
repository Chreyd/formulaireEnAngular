import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { User } from './user';
// import { ratingRangeValidator } from './x';


export function ratingRangeValidator(c: AbstractControl):{ [ key : string] : boolean } | null{

  if(!!c.value && (isNaN(c.value)) || c.value>1 || c.value<5){
    return {'rangeError': true};
  }
  return null;
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
      email: ['', [Validators.required, Validators.email]],
      phone: '',
      rating: [null, ratingRangeValidator],
      notification: 'email',
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
