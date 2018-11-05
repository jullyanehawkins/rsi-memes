import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { CompareValidatorDirective } from '../compare-validator.directive/compare';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  myForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder, private readonly authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  // checkPasswords(group: FormGroup) {
  //   let pass = group.controls.password.value;
  //   let confirmPass = group.controls.value;

  //   return pass
  // }
  // convenience getter for easy acess to form fields
  get f() { return this.registerForm.controls; }

  // checkPassword(confirmPassword: string) {
  //  return password.value === confirmPassword;
  // }
  onSubmit(email: string, password: string) {

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    if (email !== '' && password !== '') {
      this.submitted = true;

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
}
