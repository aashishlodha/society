import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-qr-code-scanner',
  templateUrl: './qr-code-scanner.component.html',
  styleUrls: ['./qr-code-scanner.component.scss'],
})
export class QrCodeScannerComponent implements OnInit {

  scanState: 'START' | 'SCANNING' | 'RESULTS' = 'START';
  user: any;

  constructor(private barcodeScanner: BarcodeScanner) {}

  ngOnInit() {}

  startScan() {
    this.scanState = 'SCANNING';
    let that = this;
    setTimeout(() => {
      that.scanState = 'RESULTS';
    }, 1000);
  }

  scan() {
    this.scanState = 'SCANNING';
    // this.user = null;
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      if (!barcodeData.cancelled) {
        this.user = JSON.parse(barcodeData.text);
        this.scanState = 'RESULTS';
      } else {
        this.scanState = 'START';
      }
    }).catch(err => {
      console.log('Error', err);
      this.scanState = 'RESULTS';
    });
  }

}
