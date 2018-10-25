import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(private readonly formBuilder: FormBuilder, private readonly authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  // convenience getter for easy acess to form fields
  get f() { return this.registerForm.controls; }

  // checkPassword(confirmPassword: string) {
  //  return password.value === confirmPassword;
  // }
  onSubmit(email: string, password: string) {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    console.log(this.authenticationService.create(email, password,
      response => {
        console.log(response);
      }, err => {
        console.error('[AuthenticationService error]: ' + err.message);
      }, () => {
        console.log('completed');
      }));
  }

}
