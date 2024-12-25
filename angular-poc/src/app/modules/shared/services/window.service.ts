import { Injectable } from '@angular/core';
import {
  Observable,
  fromEvent,
  merge,
} from 'rxjs';
import { map } from 'rxjs/operators';
import {
  DeviceBreakpoint,
  DeviceType,
} from '../constants';

@Injectable({
  providedIn: 'root',
})
export class WindowService {
  getDeviceTypeByWindowWidth(): DeviceType {
    const { innerWidth } = window;

    if (innerWidth <= DeviceBreakpoint.SM) {
      return DeviceType.MOBILE;
    }

    if (innerWidth <= DeviceBreakpoint.LG) {
      return DeviceType.TABLET;
    }

    return DeviceType.DESKTOP;
  }

  onResizeDeviceTypeByWindowWidth(): Observable<DeviceType> {
    return merge(
      fromEvent(window, 'resize'),
      fromEvent(window, 'orientationchange'),
    ).pipe(map(() => this.getDeviceTypeByWindowWidth()));
  }

  onResizeDeviceWidth(): Observable<number> {
    return merge(
      fromEvent(window, 'resize'),
      fromEvent(window, 'orientationchange'),
    ).pipe(map(() => window.innerWidth));
  }
}
