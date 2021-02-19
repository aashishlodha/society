import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HistoryService } from 'src/app/services/history.service';

@Component({
  selector: 'app-qr-history',
  templateUrl: './qr-history.component.html',
  styleUrls: ['./qr-history.component.scss'],
})
export class QrHistoryComponent implements OnInit, OnDestroy {

  subs: Subscription[] = [];
  records: any[] = [];

  constructor(private history: HistoryService) {
    this.subs.push(this.history.data.subscribe(records => this.records = records));
  }

  ngOnInit() { }

  clearHistory() {
    this.history.clearHistory();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
