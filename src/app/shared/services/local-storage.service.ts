import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}
  keyNameStart = 'AngularTodos-';
  set(key: string, data: unknown): void {
    try {
      localStorage.setItem(this.keyNameStart + key, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to local storage', error);
    }
  }
  get(key: string): unknown {
    try {
      const localStorageItem = localStorage.getItem(this.keyNameStart + key);
      return localStorageItem ? JSON.parse(localStorageItem) : null;
    } catch (error) {
      console.error('Error saving to local storage', error);
      return null;
    }
  }
}
