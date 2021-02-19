import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
  selector: 'app-qr-code-display',
  templateUrl: './qr-code-display.component.html',
  styleUrls: ['./qr-code-display.component.scss'],
})
export class QrCodeDisplayComponent implements OnInit, OnDestroy {

  userInfoString: string = 'Loading User Data';
  subs: Subscription[] = [];

  constructor(private userInfo: UserInfoService) {
    console.log('Getting user info');
    this.subs.push(this.userInfo.data.subscribe(
      user => this.userInfoString = JSON.stringify(user),
      e => {
        let error = {
          errorMsg: 'User Information is missing.'
        };
        this.userInfoString = JSON.stringify(error);
    }));
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
