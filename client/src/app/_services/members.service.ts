import { UserParams } from './../_models/userParams';
import { Member } from './../_models/member';
import { HttpClient, HttpParams} from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';
import { of, pipe } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class MembersService {

  memberCache = new Map();
  baseUrl = environment.apiUrl;
 

  constructor(private http: HttpClient) { }

  getMembers(userParams: UserParams){

    var response = this.memberCache.get(Object.values(userParams).join('-'));
    if (response)
    { 
      return of(response);
    }
 //changes



    let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);
    params = params.append('minAge', userParams.minAge.toString());// min age needs to be check
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);
    
    return this.getPaginatedResult<Member[]>(this.baseUrl + 'users', params)
    .pipe(map(response => {
      this.memberCache.set(Object.values(userParams).join('-'), response);
      return response;
    }))
  }

  private getPaginatedResult<T>(url, params) {
    const  paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
  }

  private getPaginationHeaders(pageNumber: number, pageSize: number)
  {
    let params = new HttpParams();

     
      params = params.append('pageNumber', pageNumber.toString());
      params = params.append('pageSize', pageSize.toString());

      return params;
    

  }

  getMember(username: string) {
    const member = [...this.memberCache.values()]
    .reduce((arr, elem) => arr.concat(elem.result), [])
    .find((member: Member) => member.username === username);

    if(member)
    {
      return of (member);
    }



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
