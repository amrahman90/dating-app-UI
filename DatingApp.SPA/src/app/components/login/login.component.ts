import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth/auth.service';
import { AlertifyService } from '../../_services/alertify/alertify.service';
import { Router } from '@angular/router';
import { UserSignIn } from '../../_models/account.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: UserSignIn;

  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.model = new UserSignIn();
  }

  login() {
    this.authService.login(this.model).subscribe(data => {
      this.alertify.success('logged in successfully');
      this.router.navigate(['/members']);
    }, error => {
      this.alertify.error('Failed to log in');
    });
  }

}
