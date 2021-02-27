import { Component, OnInit } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AppToastService } from 'src/app/services/app-toast.service';
import { DataStoreService } from 'src/app/services/data-store.service';
import { User } from '../profile/user.model';
import { GuestQR } from './guest.model';

@Component({
  selector: 'app-qr-code-generator',
  templateUrl: './qr-code-generator.component.html',
  styleUrls: ['./qr-code-generator.component.scss'],
})
export class QrCodeGeneratorComponent implements OnInit {

  guest: GuestQR = new GuestQR(null, null, null);
  host: User;
  visitorQRString: string;
  minFrom: string = '2020-02-14';
  maxFrom: string = '2020-02-16';
  minTo: string = '';
  maxTo: string = '';
  state: 'START' | 'RESULTS' = 'START';

  canShareViaEmail = false;
  canShareViaWhatsapp = false;
  sharableApps: string[] = [];

  constructor(private dataStore: DataStoreService, private socialSharing: SocialSharing, private toastService: AppToastService) {
    this.dataStore.getObject('user').then(userData => {
      console.log('fetched User info', userData);
      if (userData) {
        this.host = userData;
        this.guest = new GuestQR(null, null, this.host);
      }
    });

    // Check if sharing via email is supported
    this.socialSharing.canShareViaEmail().then(() => {
      this.canShareViaEmail = true;
      console.log('canShareViaEmail', this.canShareViaEmail);
    }).catch((e) => {
      this.canShareViaEmail = false;
      console.error(e);
    });

    // Check if you can share via a specific app
    this.socialSharing.canShareVia('Whatsapp').then(() => {
      this.canShareViaWhatsapp = true;
      console.log('canShareViaEmail', this.canShareViaWhatsapp);
    }).catch((e) => {
      this.canShareViaWhatsapp = false;
      console.error(e);
    });
  }

  ngOnInit() {}

  generateQR() {
    this.visitorQRString = JSON.stringify(this.guest);
    this.state = 'RESULTS';
    this.toastService.presentToast('QR code generated successfully.');
    // this.toastService.presentToastWithOptions();
  }

  openShareOptions() {

  }

  shareVisitorPassViaEmail(pass) {
    // Share via email
    this.socialSharing.shareViaEmail('Body', 'Subject', ['recipient@example.org']).then(() => {
      console.log('Success');
    // Success!
    }).catch(() => {
      // Error!
    });
  }

  shareVisitorPassViaWhatsapp(qrElement) {
    console.log(qrElement.qrcElement.nativeElement);
    const parentElement = qrElement.qrcElement.nativeElement.firstChild;
    console.log(parentElement);

    // converts base 64 encoded image to blobData
    // let blobData = this.convertBase64ToBlob(parentElement);
    console.log(parentElement.toDataURL('image/png', 1));
    // Share via email
    this.socialSharing.shareViaWhatsApp("Visitor Pass", parentElement.toDataURL('image/png', 1), '').then(() => {
    // Success!
    }).catch(() => {
      // Error!
    });
  }

  share(qrElement) {
    console.log(qrElement.qrcElement.nativeElement);
    const parentElement = qrElement.qrcElement.nativeElement.firstChild;
    console.log(parentElement);

    // converts base 64 encoded image to blobData
    // let blobData = this.convertBase64ToBlob(parentElement);
    console.log(parentElement.toDataURL('image/png', 1));
    this.socialSharing.share("Visitor Pass", "Sagar", parentElement.toDataURL('image/png', 1), '').then(() => {
      // Success!
      }).catch(() => {
        // Error!
      });
  }

  saveToAlbum(qrElement) {
    // return;
    // fetches base 64 date from image
    console.log(qrElement.qrcElement.nativeElement);
    const parentElement = qrElement.qrcElement.nativeElement.firstChild;
    console.log(parentElement);

    // converts base 64 encoded image to blobData
    // let blobData = this.convertBase64ToBlob(parentElement);
    console.log(parentElement.toDataURL('image/png', 1));
    this.socialSharing.saveToPhotoAlbum(parentElement.toDataURL('image/png', 1));
  }

}
