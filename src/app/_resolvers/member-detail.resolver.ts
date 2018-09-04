import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

import { User } from '../_models/user';
import { AlertifyService } from '../_services/alertify/alertify.service';
import { UserService } from '../_services/user/user.service';

@Injectable()
export class MemberDetailResolver implements Resolve<User> {

    constructor(private userService: UserService,
        private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userService.getUser(route.params['id']).catch(error => {
            this.alertify.error('Problem retrieving data');
            this.router.navigate(['/members']);
            return Observable.of(null);
        });
    }
}
