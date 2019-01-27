import { Injectable } from '@angular/core';
import * as appSettings from 'tns-core-modules/application-settings/application-settings';


@Injectable()
export class LocalStorage {
  constructor() {}

  saveValue(value: any, name: string): boolean {
    appSettings.setString(name, JSON.stringify(value));
    return true;
  }

  getValue(value: string): any {
    const valueToReturn = appSettings.getString(value);
    return valueToReturn ? JSON.parse(valueToReturn) : null;
  }

  removeValue(value: string): void {
    appSettings.remove(value);
  }

  clear(): void {
    appSettings.clear();
  }
}
