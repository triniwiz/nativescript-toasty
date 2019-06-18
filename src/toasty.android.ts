import { Color } from 'tns-core-modules/color';
import { screen } from 'tns-core-modules/platform';
import { ad as androidUtils } from 'tns-core-modules/utils/utils';
import { ToastDuration, ToastPosition, ToastyOptions } from './toast.common';
export * from './toast.common';

export class Toasty {
  private _position: ToastPosition;
  private _duration: ToastDuration;
  private _text: string;
  private _backgroundColor;
  private _textColor;
  private _androidOpts: { yAxisOffset: number };
  private _toast: android.widget.Toast;
  private _screenHeight: number;

  constructor(opts: ToastyOptions) {
    this._screenHeight = screen.mainScreen.heightDIPs;

    this._text = opts.text;
    this._duration = opts.duration;
    this._position = opts.position;
    this._textColor = opts.textColor;
    this._backgroundColor = opts.backgroundColor;
    this._androidOpts = opts.android;

    // create the android Toast
    this._toast = android.widget.Toast.makeText(
      androidUtils.getApplicationContext(),
      this._text,
      android.widget.Toast.LENGTH_SHORT
    );

    // set the values
    this.setToastDuration(this._duration)
      .setToastPosition(this._position)
      .setTextColor(this._textColor)
      .setBackgroundColor(this._backgroundColor);

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
    let yOffset;
    if (this._androidOpts && this._androidOpts.yAxisOffset) {
      yOffset = this._androidOpts.yAxisOffset;
    } else {
      yOffset = this._screenHeight * 0.075;
    }

    switch (value) {
      case ToastPosition.TOP:
        this._toast.setGravity(android.view.Gravity.TOP, 0, yOffset);
        break;
      case ToastPosition.CENTER:
        this._toast.setGravity(android.view.Gravity.CENTER, 0, 0);
        break;
      case ToastPosition.BOTTOM:
        this._toast.setGravity(android.view.Gravity.BOTTOM, 0, yOffset);
        break;
      default:
        break;
    }

    return this;
  }
}
