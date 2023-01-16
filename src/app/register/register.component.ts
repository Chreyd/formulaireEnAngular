import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { User } from './user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm!: FormGroup;

  public user : User = new User();
  public saveData( ){
    console.log(this.registerForm);
    console.log('object', JSON.stringify(this.registerForm?.value))
  }

  constructor(private fb : FormBuilder){
  }
  ngOnInit(): void {
    this.registerForm=this.fb.record({
      firstName: '',
      lastName: '',
      email: '',
      sendCatalog: false,
    })

/*     this.registerForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      sendCatalog: new FormControl(true),
    }); */
  }

  public fillFormData():void{
    this.registerForm.setValue({
      firstName: 'Chreyd',
      lastName: 'BPloop',
      email: "chre@tset.com",
      sendCatalog: true,
    })
/*     this.registerForm.patchValue({
      firstName: 'Chreyd',
      lastName: 'BPloop',
    }) */
  }

}
