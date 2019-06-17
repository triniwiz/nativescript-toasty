/// <reference path="./node_modules/tns-platform-declarations/android.d.ts" />

import { Color } from 'tns-core-modules/color';
import { ad as androidUtils } from 'tns-core-modules/utils/utils';
import { ToastDuration, ToastPosition } from './toast.common';
export * from './toast.common';

export class Toasty {
  private _position: ToastPosition;
  private _duration: ToastDuration;
  private _text: string;
  private _backgroundColor;
  private _textColor;
  private _toast: android.widget.Toast;

  constructor(
    text: string,
    duration?: ToastDuration,
    position?: ToastPosition,
    textColor?: Color | string,
    backgroundColor?: Color | string
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
    this.setTextColor(textColor);
    this.setBackgroundColor(backgroundColor);

    return this;
  }

  get position() {
    return this._position;
  }

  set position(value: ToastPosition) {
    if (value) {
      this._position = value;
      this.setToastPosition(value);
    }
  }

  get duration() {
    return this._duration;
  }

  set duration(value: ToastDuration) {
    if (value) {
      this._duration = value;
      this.setToastDuration(value);
    }
  }

  get textColor() {
    return this._textColor;
  }

  set textColor(value: Color | string) {
    if (value) {
      this._textColor = value;
      this.setTextColor(value);
    }
  }

  get backgroundColor() {
    return this._backgroundColor;
  }

  set backgroundColor(value: Color | string) {
    if (value) {
      this._backgroundColor = value;
      this.setBackgroundColor(value);
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

  setTextColor(value: Color | string) {
    if (value) {
      this._textColor = value;
      const view = this._toast.getView();
      const text = view.findViewById(
        android.R.id.message
      ) as android.widget.TextView;
      // set the text color
      if (typeof value === 'string') {
        const nativeColor = new Color(value).android;
        text.setTextColor(nativeColor);
      } else {
        text.setTextColor(value.android);
      }
      // do we need this?
      text.setShadowLayer(0, 0, 0, 0);
    }

    return this;
  }

  setBackgroundColor(value: Color | string) {
    if (value) {
      this._backgroundColor = value;
      const view = this._toast.getView();
      if (typeof value === 'string') {
        const nativeColor = new Color(value).android;
        view.setBackgroundColor(nativeColor);
      } else {
        view.setBackgroundColor(value.android);
      }
    }

    return this;
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
      // case to allow user to let the OS use default
      case ToastPosition.NO_SETTING:
        break;
      default:
        // leaving this as default to avoid a breaking change for now - next major release can drop the NO_SETTING value and default for nothing in this switch
        this._toast.setGravity(android.view.Gravity.BOTTOM, 0, 0);
        break;
    }

    return this;
  }
}
