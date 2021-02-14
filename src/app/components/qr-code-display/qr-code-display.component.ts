import { Component, OnInit } from '@angular/core';
import { DataStoreService } from 'src/app/services/data-store.service';
import { User } from '../profile/user.model';

@Component({
  selector: 'app-qr-code-display',
  templateUrl: './qr-code-display.component.html',
  styleUrls: ['./qr-code-display.component.scss'],
})
export class QrCodeDisplayComponent implements OnInit {

  userInfoString: string = 'Loading User Data';

  constructor(private dataStore: DataStoreService) {
    console.log('Getting user info');
    this.dataStore.getObject('user').then(userData => {
      console.log('fetched User info', userData);
      if (userData) {
        this.userInfoString = JSON.stringify(userData);
      } else {
        let error = {
          errorMsg: 'User Information is missing.'
        };
        this.userInfoString = JSON.stringify(error);
      }
    });
  }

  ngOnInit() {}

}
