import { Member } from './../_models/member';
import { HttpClient} from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class MembersService {

 
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMembers(){
    return this.http.get<Member[]>(this.baseUrl + 'users');
  }
  getMember(username: string) {
    return this.http.get<Member>(this.baseUrl + 'users/'+ username);
  }

  setMainPhoto(photoId: number)
  {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }

  // updateMember(member:Member)
  // {
  //   return this.http.put(this.baseUrl + 'users', member);
  // }

  deletePhoto(photoId: number)
  {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }
}
