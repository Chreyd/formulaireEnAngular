import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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

  constructor(){
  }
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstname: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      sendCatalog: new FormControl(true),
    });
  }

}
