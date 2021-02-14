import { Component } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';

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

  constructor(private callNumberService: CallNumber) { }

  callNumber(contactNo: string) {
    this.callNumberService.callNumber(contactNo, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }
}
