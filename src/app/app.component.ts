import { Component } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { User } from './components/profile/user.model';
import { UserInfoService } from './services/user-info.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Scan', url: '/Scan', icon: 'scan' },
    { title: 'Create QR', url: '/CreateQR', icon: 'qr-code' },
    { title: 'History', url: '/History', icon: 'book' },
    { title: 'Profile', url: '/Profile', icon: 'person-circle' },
    { title: 'About', url: '/About', icon: 'help' }
  ];
  public contacts = [
    {
      name: 'Secretary',
      contactNo: '8149484418'
    }, {
      name: 'Body Member 1',
      contactNo: '8149484418'
    },
    {
      name: 'Body Member 2',
      contactNo: '8149484418'
    },
    {
      name: 'Police',
      contactNo: '8149484418'
    }
  ];
  subs: Subscription[] = [];
  user: User;

  constructor(private callNumberService: CallNumber,
    private userInfo: UserInfoService,
    private alertController: AlertController
  ) {
    this.subs.push(this.userInfo.data.subscribe(
      userData => this.user = {...userData}));
  }

  async handleCallNumber(contactNo: string) {
    const alert = await this.alertController.create({
      header: 'Call?',
      message: 'This will initiate the call to ' + contactNo,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this.callNumberService.callNumber(contactNo, true)
              .then(res => console.log('Launched dialer!', res))
              .catch(err => console.log('Error launching dialer', err));
          }
        }
      ]
    });

    await alert.present();
  }
}
