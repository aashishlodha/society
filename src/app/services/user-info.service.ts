import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../components/profile/user.model';
import { DataStoreService } from './data-store.service';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  private dataSource = new BehaviorSubject<User>(new User('', '', 0, '', 0));
  data = this.dataSource.asObservable();

  constructor(private dataStore: DataStoreService) {
    this.dataStore.getObject('user').then(userInfo => {
      if (userInfo) {
        this.dataSource.next(userInfo);
      }
    }).catch( e => {
      this.dataSource.next(new User('', '', 0, '', 0));
      console.error(e);
    });
  }

  updateUser(user: User) {
    this.dataSource.next(user);
    this.dataStore.setObject('user', user);
  }

}
