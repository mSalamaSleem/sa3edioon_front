import { HideNavbarService } from 'src/app/services/hide-navbar.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { HideFooterService } from 'src/app/services/hide-footer.service';
import { TestiHideService } from 'src/app/services/testi-hide.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  // tslint:disable-next-line:variable-name
  constructor(private _form_builder: FormBuilder, private http: HttpClient, private router: Router,
    public testi: TestiHideService, public nav:HideNavbarService, public footer: HideFooterService) { }

  ngOnInit(): void {
    this.testi.hide();
    this.nav.hide();
    this.footer.hide();
    this.form = this._form_builder.group({
      name: '',
      username: '',
      email: '',
      password: ''
    });
  }

  submit(): void{
    this.http.post('http://127.0.0.1:8000/register/', this.form.getRawValue()).subscribe(
      (result) => {
        alert('You are registered Now!');
        this.router.navigate(['/login']);
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
