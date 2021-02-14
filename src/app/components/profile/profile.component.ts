import { Component, OnInit } from '@angular/core';
import { DataStoreService } from 'src/app/services/data-store.service';
import { User } from './user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  user: User = new User(null, null, null, null, null);

  constructor(private dataStore: DataStoreService) {
    this.dataStore.getObject('user').then(userData => {
      console.log('fetched User info', userData);
      if (userData) {
        this.user = userData;
      }
    });
  }

  ngOnInit() {}

  updateProfile() {
    let userData = {...this.user};
    this.dataStore.setObject('user', userData);
    console.log(userData.toString());
  }

}
