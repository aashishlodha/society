import { Injectable } from '@angular/core';

import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  constructor() { }

  async setObject(keyName: string, object: any) {
    await Storage.set({
      key: keyName,
      value: JSON.stringify(object)
    });
  }

  async getObject(keyName: string) {
    const ret = await Storage.get({ key: keyName });
    const user = JSON.parse(ret.value);
    return user;
  }

  async remove(keyName: string) {
    await Storage.remove({ key: keyName });
  }

  async keys() {
    const { keys } = await Storage.keys();
    console.log('Got keys: ', keys);
  }

  async clear() {
    await Storage.clear();
  }
}
