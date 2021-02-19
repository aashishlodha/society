import { Component, Input, OnInit } from '@angular/core';
import { ScanRecord } from '../qr-code-scanner/scan-record.model';

@Component({
  selector: 'app-scan-record',
  templateUrl: './scan-record.component.html',
  styleUrls: ['./scan-record.component.scss'],
})
export class ScanRecordComponent implements OnInit {

  @Input() data: ScanRecord;
  userType: 'Resident' | 'Visitor';
  name: string;
  date: string;

  constructor() {

  }

  ngOnInit() {
    this.date = this.data.date;
  }

}
