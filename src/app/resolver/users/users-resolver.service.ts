import { Injectable } from '@angular/core';
import { UsersApiService } from 'src/app/api/users/users-api.service';
import { Router, Resolve } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersResolverService implements Resolve<any> {
  constructor(
    private usersApiService: UsersApiService,
    private router: Router,
  ) {}

  resolve(): Promise<any> {
    const users = this.usersApiService.getUsers();

    return Promise.all([users]).then((data: any) => {
      if (data) {
        return {'usuarios' : data[0]};
      } else {
        // id not found
        this.router.navigate(['/']);
        return false;
      }
    });
  }
}
