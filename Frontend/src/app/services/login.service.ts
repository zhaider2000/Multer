import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Gallery } from '../Gallery';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private profiles: Gallery[] = [];
  private profiles$ = new Subject<Gallery[]>();
  readonly url = "http://localhost:3000/photos";


  constructor(private http: HttpClient) { }


  viewSoldProducts(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/sold', {
      withCredentials: true,
    });
  }


  addProfile(name: string, image: File): void {
    console.log(name,image)
    const profileData = new FormData();
    profileData.append("name", name);
    profileData.append("image", image, name);
    console.log(profileData)
    this.http
      .post<{ profile: Gallery }>(this.url, profileData)
      .subscribe((profileData) => {
        const profile:Gallery = {
          _id: profileData.profile._id,
          name: name,
          imagePath: profileData.profile.imagePath,
        };
        this.profiles.push(profile);
        this.profiles$.next(this.profiles);
      });
  }

  getProfiles() {
    this.http
      .get<{ profiles: Gallery[] }>(this.url)
      .pipe(
        map((profileData) => {
          return profileData.profiles;
        })
      )
      .subscribe((profiles) => {
        this.profiles = profiles;
        this.profiles$.next(this.profiles);
      });
  }

  getProfilesStream() {
    return this.profiles$.asObservable();
  }




}
