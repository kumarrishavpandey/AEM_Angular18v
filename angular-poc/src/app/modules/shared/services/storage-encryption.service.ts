/* eslint  prefer-promise-reject-errors: 'off' */
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { AuthService } from './auth.service';
import { environment } from '../../../../environments/environment';
import { DebugService } from './debug.service';
import { AD_ACCESS_TOKEN, LOGGEDIN_EMP } from '../../../app.api';
// import { AD_ACCESS_TOKEN, LOGGEDIN_EMP } from 'src/app/app.api';
// import { AuthService } from 'src/app/shared/services/auth.service';
// import { DebugService } from 'src/app/shared/services/debug.service';
// import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StorageEncryptionService {
  constructor(
    private authService: AuthService,
    private debugService: DebugService,
  ) {}

  protected encrypt(data: string): string {
    const encrypted = CryptoJS.AES.encrypt(data, environment.STORAGE_ENC).toString();
    return encrypted;
  }

  protected decrypt(data: string): string {
    const decrypted = CryptoJS.AES.decrypt(data, environment.STORAGE_ENC).toString(CryptoJS.enc.Utf8);
    return decrypted;
  }

  getvalue(key) {
    const empId = sessionStorage.getItem(key);
    if (empId) {
      try {
        return this.decrypt(empId);
      } catch (error) {
        if (error instanceof Error) {
          if (error.message === 'Malformed UTF-8 data') {
            this.deletevalue(key);
            this.authService.refreshPage();
          }
        }

        this.debugService.error('[storage encryption]', error);
      }
    }

    return '';
  }

  getDecryptedValueFromSession(
    key: string,
    applyDelay?: boolean,
  ): Promise<string> {
    const shouldApplyDelay = applyDelay ?? false;
    return new Promise((resolve, reject) => {
      this.getValueFromSessionStorage(key, shouldApplyDelay)
        .then((value: string) => {
          const decryptedValue = this.decrypt(value);
          resolve(decryptedValue);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getValueFromSessionStorage(key, applyDelay, maxAttempts = 10, delay = 100) {
    return new Promise((resolve, reject) => {
      const attempt = (remainingAttempts) => {
        const value = sessionStorage.getItem(key);

        if (value !== null) {
          resolve(value);
        } else if (remainingAttempts > 0) {
          if (applyDelay) {
            setTimeout(() => {
              attempt(remainingAttempts - 1);
            }, delay);
          } else {
            attempt(remainingAttempts - 1);
          }
        } else {
          reject('');
        }
      };
      attempt(maxAttempts);
    });
  }

  setvalue(key, value) {
    sessionStorage.setItem(key, this.encrypt(value));
  }

  deletevalue(key) {
    sessionStorage.removeItem(key);
  }

  setEmpId(empId: string): void {
    sessionStorage.setItem(LOGGEDIN_EMP, this.encrypt(empId));
  }

  getEmpId(): string {
    const empId = sessionStorage.getItem(LOGGEDIN_EMP);

    if (empId) {
      try {
        return this.decrypt(empId);
      } catch (error) {
        this.debugService.error('[storage encryption]', error);
        this.authService.logout();
      }
    }

    return '';
  }

  deleteEmpId() {
    sessionStorage.removeItem(LOGGEDIN_EMP);
  }

  setAccessToken(value) {
    localStorage.setItem(AD_ACCESS_TOKEN, value);
  }

  get accessToken() {
    return localStorage.getItem(AD_ACCESS_TOKEN);
  }

  deleteAccessToken() {
    localStorage.removeItem(AD_ACCESS_TOKEN);
  }

  deleteNativeAppCred() {
    this.deleteEmpId();
    this.deleteAccessToken();
  }
}
