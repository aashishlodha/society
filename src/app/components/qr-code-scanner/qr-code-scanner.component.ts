import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { HistoryService } from 'src/app/services/history.service';
import { User } from '../profile/user.model';
import { GuestQR } from '../qr-code-generator/guest.model';
import { ScanRecord } from './scan-record.model';

@Component({
  selector: 'app-qr-code-scanner',
  templateUrl: './qr-code-scanner.component.html',
  styleUrls: ['./qr-code-scanner.component.scss'],
})
export class QrCodeScannerComponent implements OnInit {

  scanState: 'START' | 'SCANNING' | 'RESULTS' = 'START';
  user: User;
  guest: GuestQR;
  userType: 'VISITOR' | 'RESIDENT';

  constructor(private barcodeScanner: BarcodeScanner, private history: HistoryService) {}

  ngOnInit() {}

  startScan() {
    this.scanState = 'SCANNING';
    let that = this;
    setTimeout(() => {
      that.scanState = 'RESULTS';
      this.addToHistory('hhhhh');
    }, 1000);
  }

  scan() {
    this.scanState = 'SCANNING';
    // this.user = null;
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      if (!barcodeData.cancelled) {
        let userInfo = JSON.parse(barcodeData.text);
        console.log(userInfo);
        if (userInfo.flatNo) {
          this.userType = 'RESIDENT';
          this.guest = null;
          this.user = userInfo;
        } else {
          this.userType = 'VISITOR';
          this.guest = userInfo;
          this.user = userInfo.host;
        }
        this.scanState = 'RESULTS';
        this.addToHistory(barcodeData.text);
      } else {
        this.scanState = 'START';
      }
    }).catch(err => {
      console.log('Error', err);
      this.scanState = 'RESULTS';
    });
  }

  addToHistory(qrData) {
    let scanRecord = new ScanRecord((new Date()).toUTCString(), qrData);
    this.history.addScanRecord(scanRecord);
  }

}
