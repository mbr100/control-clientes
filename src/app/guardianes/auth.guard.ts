import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate
{
    canActivate(): Observable<boolean>
    {
        return this.afAuth.authState.pipe(
            map(auth => {
                if ((!auth)) {
                    this.router.navigate([`/login`]);
                    return false;
                }
                else {
                    return true;
                }
            }));
    }

    constructor(private router: Router, private afAuth: AngularFireAuth) {}
}
