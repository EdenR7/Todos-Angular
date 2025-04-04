import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}
  localStoragePre = environment.localStoragePrefix;
  set(key: string, data: unknown): void {
    try {
      localStorage.setItem(this.localStoragePre + key, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to local storage', error);
    }
  }
  get(key: string): unknown {
    try {
      const localStorageItem =
        localStorage.getItem(this.localStoragePre + key) || null;

      return localStorageItem ? JSON.parse(localStorageItem) : null;
    } catch (error) {
      console.error('Error getting from local storage', error);
      return null;
    }
  }
  remove(key: string): void {
    try {
      localStorage.removeItem(this.localStoragePre + key);
    } catch (error) {
      console.error('Error removing from local storage', error);
    }
  }
}
