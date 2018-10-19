/// <reference path="./node_modules/tns-platform-declarations/android.d.ts" />

import { ad as androidUtils } from 'tns-core-modules/utils/utils';
import { ToastDuration, ToastPosition } from './toast.common';
export * from './toast.common';

export class Toasty {
  private _text: string;
  private _toast: android.widget.Toast;

  constructor(
    text: string,
    duration?: ToastDuration,
    position?: ToastPosition
  ) {
    this._text = text;

    // create the android Toast
    this._toast = android.widget.Toast.makeText(
      androidUtils.getApplicationContext(),
      text,
      android.widget.Toast.LENGTH_SHORT
    );

    // set the toast duration
    this._setToastDuration(duration);
    this._setToastPosition(position);
  }

  show() {
    if (!this._text) {
      throw new Error('Toasty Text is not set.');
    } else {
      this._toast.show();
    }
  }

  cancel() {
    if (this._toast) {
      this._toast.cancel();
    }
  }

  private _setToastDuration(value: any) {
    switch (value) {
      case ToastDuration.SHORT:
        this._toast.setDuration(android.widget.Toast.LENGTH_SHORT);
        break;
      case ToastDuration.LONG:
        this._toast.setDuration(android.widget.Toast.LENGTH_LONG);
        break;
      default:
        this._toast.setDuration(android.widget.Toast.LENGTH_SHORT);
        break;
    }
  }

  private _setToastPosition(value) {
    switch (value) {
      case ToastPosition.TOP:
        this._toast.setGravity(android.view.Gravity.TOP, 0, 0);
        break;
      case ToastPosition.CENTER:
        this._toast.setGravity(android.view.Gravity.CENTER, 0, 0);
        break;
      case ToastPosition.BOTTOM:
        this._toast.setGravity(android.view.Gravity.BOTTOM, 0, 0);
        break;
      default:
        this._toast.setGravity(android.view.Gravity.BOTTOM, 0, 0);
        break;
    }
  }
}
