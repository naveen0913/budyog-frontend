import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiTypes, ApiUrl } from '../api/api-config';
import { API_END_POINTS } from '../api/api-constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  private GET_API_URL = ApiUrl.baseUrl+API_END_POINTS.getUser.url;
  private LOGIN_URL = ApiUrl.baseUrl+API_END_POINTS.userLogin.url;
  private SIGNUP_URL = ApiUrl.baseUrl+API_END_POINTS.userSignin.url;
  
  constructor(private http: HttpClient) { }
  
  public getUserByEmailPhone(data:any):Observable<any>{
    return this.http.get<any>(`${this.GET_API_URL+data}`);
  }

  public userLogin(data:any):Observable<any>{
    return this.http.post<any>(this.LOGIN_URL,data);
  }

  public userSignUp(data:any) : Observable<any>{
    return this.http.post<any>(this.SIGNUP_URL,data)
  }

}
