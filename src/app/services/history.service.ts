import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ScanRecord } from '../components/qr-code-scanner/scan-record.model';
import { DataStoreService } from './data-store.service';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private dataSource = new BehaviorSubject<any[]>([]);
  data = this.dataSource.asObservable();

  constructor(private dataStore: DataStoreService) {
    this.dataStore.getObject('scanHistory').then((records) => {
      console.log("records", records);
      if (!records) records = [];
      this.dataSource.next([...records]);
    });
  }

  addScanRecord(scanRecord: ScanRecord) {
    this.dataStore.getObject('scanHistory').then((records) => {
      if (!records) records = [];
      let newRecords = [...records];
      newRecords.push(scanRecord);
      this.dataSource.next(newRecords);
      this.dataStore.setObject('scanHistory', newRecords);
    });
  }

  clearHistory() {
    this.dataStore.setObject('scanHistory', []).then(() => {
      console.log('cleared');
      this.dataSource.next([]);
    });
  }

}
