import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {LoginService} from '../../servicios/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit
{
    email: string;
    password: string;

    constructor(private router: Router, private flashMessafes: FlashMessagesService, private loginService: LoginService) {}

    ngOnInit(): void
    {
        this.loginService.getAuth().subscribe(auth => {
            if (auth)
            {
                this.router.navigate([`/`]);
            }
        });
    }

    login(): void
    {
        this.loginService.login(this.email, this.password).then(
            res => {
                this.router.navigate([`/`]);
            })
            .catch( error => {
                this.flashMessafes.show(error.message, {
                    cssClass: `alert-danger`, timeout: 4000
                });
            });
    }
}
