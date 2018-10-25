import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  // styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  myForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
   }

  ngOnInit()  {
    this.registerForm = this.formBuilder.group({
      email: ['', [ Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  // convenience getter for easy acess to form fields
    get f() { return this.registerForm.controls; }
  onSubmit() {
    if (this.email !== '' && this.password !== '')this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    alert('SUCCESS!!');
  }
}
