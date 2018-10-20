/// <reference path="./node_modules/tns-platform-declarations/android.d.ts" />

import { ad as androidUtils } from 'tns-core-modules/utils/utils';
import { ToastDuration, ToastPosition } from './toast.common';
export * from './toast.common';

export class Toasty {
  private _position: ToastPosition;
  private _duration: ToastDuration;
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
    this.setToastDuration(duration);
    this.setToastPosition(position);

    return this;
  }

  public get position() {
    return this._position;
  }

  public set position(value: ToastPosition) {
    if (value) {
      this._position = value;
      this.setToastPosition(value);
    }
  }

  public get duration() {
    return this._duration;
  }

  public set duration(value: ToastDuration) {
    if (value) {
      this._duration = value;
      this.setToastDuration(value);
    }
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

  setToastDuration(value: ToastDuration) {
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

    return this;
  }

  setToastPosition(value: ToastPosition) {
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

    return this;
  }
}
