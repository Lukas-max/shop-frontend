/* tslint:disable */
import { Injectable } from '@angular/core';
import {User} from '../model/user';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../../../app.consts';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersUrl = 'api/users';
  constructor(private http: HttpClient) {
  }

  // register user:
  public createUser(user: User) {
    return this.http.post(`${API_URL}/${this.usersUrl}/register`, user)
      .pipe(catchError(this.handleError));
  }

  // check if user exists, RegisterComponent:
  public getUserByName(username: string){
    const httpOptions = {
      params: { 'username': username }
    };

    return this.http.get<any>(`${API_URL}/${this.usersUrl}/user`, httpOptions);
  }

  private handleError(error){
    // console.log(error);
    return throwError(error);
  }
}
