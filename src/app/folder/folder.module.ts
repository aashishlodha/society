import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { QRCodeModule } from 'angularx-qrcode';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { QrCodeScannerComponent } from '../components/qr-code-scanner/qr-code-scanner.component';
import { QrCodeGeneratorComponent } from '../components/qr-code-generator/qr-code-generator.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { QrHistoryComponent } from '../components/qr-history/qr-history.component';
import { AboutComponent } from '../components/about/about.component';
import { ScanRecordComponent } from '../components/scan-record/scan-record.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,
    QRCodeModule
  ],
  declarations: [
    FolderPage,
    QrCodeScannerComponent,
    QrCodeGeneratorComponent,
    QrHistoryComponent,
    ProfileComponent,
    AboutComponent,
    ScanRecordComponent
  ],
  providers: [
    BarcodeScanner,
    SocialSharing
  ]
})
export class FolderPageModule {}
