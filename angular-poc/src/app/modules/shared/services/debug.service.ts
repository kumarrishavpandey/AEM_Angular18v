/* eslint-disable no-console */
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
// import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DebugService {
  log(...message: any): void {
    if (environment.DEBUG_MODE) {
      console.log('[LOG]', ...message);
    }
  }

  error(...message: any): void {
    if (environment.DEBUG_MODE) {
      console.error('[ERROR]', ...message);
    }
  }

  warn(...message: any): void {
    if (environment.DEBUG_MODE) {
      console.warn('[WARN]', ...message);
    }
  }

  info(...message: any): void {
    if (environment.DEBUG_MODE) {
      console.info('[INFO]', ...message);
    }
  }

  debug(...message: any): void {
    if (environment.DEBUG_MODE) {
      console.debug('[DEBUG]', ...message);
    }
  }

  trace(...message: any): void {
    if (environment.DEBUG_MODE) {
      console.trace('[TRACE]', ...message);
    }
  }
}
