import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { Gallery } from '../Gallery';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-gallery-details',
  templateUrl: './gallery-details.component.html',
  styleUrls: ['./gallery-details.component.css']
})
export class GalleryDetailsComponent implements OnInit {

  profiles: Gallery[] = [];
  profileSubscription: Subscription

  constructor(private myservice:LoginService) { }

  ngOnInit(): void {
    this.myservice.getProfiles();
    this.profileSubscription = this.myservice
      .getProfilesStream()
      .subscribe((profiles: Gallery[]) => {
        this.profiles = profiles;
        console.log(this.profiles)
      });
  }

}
