import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStoreService } from 'src/app/services/data-store.service';
import { UserInfoService } from 'src/app/services/user-info.service';
import { User } from './user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {

  user: User = new User(null, null, null, null, null);
  subs: Subscription[] = [];

  constructor(private userInfo: UserInfoService) {
    this.subs.push(this.userInfo.data.subscribe(userData => this.user = {...userData}));
  }

  ngOnInit() {}

  updateProfile() {
    let userData = {...this.user};
    this.userInfo.updateUser(userData);
    console.log(userData.toString());
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
