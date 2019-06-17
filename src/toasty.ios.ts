/// <reference path="./typings/objc!Toast.d.ts" />

import { Color } from 'tns-core-modules/color';
import { device } from 'tns-core-modules/platform';
import { DeviceType } from 'tns-core-modules/ui/enums';
import * as frameModule from 'tns-core-modules/ui/frame';
import { ToastDuration, ToastPosition } from './toast.common';
export * from './toast.common';

export class Toasty {
  private _duration: ToastDuration;
  private _position: ToastPosition;
  private _text: string;
  private _backgroundColor;
  private _textColor;
  private _csToaststyle: CSToastStyle;

  constructor(
    text: string,
    duration?: ToastDuration,
    position?: ToastPosition,
    textColor?: Color | string,
    backgroundColor?: Color | string
  ) {
    this._text = text;
    this._csToaststyle = CSToastStyle.alloc().initWithDefaultStyle();

    // set the position and duration of the toast
    this.setToastPosition(position);
    this.setToastDuration(duration);
    this.setTextColor(textColor);
    this.setBackgroundColor(backgroundColor);

    CSToastManager.setSharedStyle(this._csToaststyle);

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
      throw new Error('Text is not set');
    } else {
      Toasty._getView().makeToast(this._text);
    }
  }

  cancel() {
    Toasty._getView().hideToasts();
  }

  setTextColor(value: Color | string) {
    if (value) {
      this._textColor = value;
      // set the text color
      if (typeof value === 'string') {
        const nativeColor = new Color(value).ios;
        this._csToaststyle.messageColor = nativeColor;
      } else {
        this._csToaststyle.messageColor = value.ios;
      }
      // setting the shared style so the colors apply properly
      CSToastManager.setSharedStyle(this._csToaststyle);
    }

    return this;
  }

  setBackgroundColor(value: Color | string) {
    if (value) {
      this._backgroundColor = value;
      // set the text color
      if (typeof value === 'string') {
        const nativeColor = new Color(value).ios;
        this._csToaststyle.backgroundColor = nativeColor;
      } else {
        this._csToaststyle.backgroundColor = value.ios;
      }
      // setting the shared style so the colors apply properly
      CSToastManager.setSharedStyle(this._csToaststyle);
    }

    return this;
  }

  setToastPosition(value: ToastPosition) {
    switch (value) {
      case ToastPosition.TOP:
        CSToastManager.setDefaultPosition(CSToastPositionTop);
        break;
      case ToastPosition.CENTER:
        CSToastManager.setDefaultPosition(CSToastPositionCenter);
        break;
      case ToastPosition.BOTTOM:
        CSToastManager.setDefaultPosition(CSToastPositionBottom);
        break;
      default:
        CSToastManager.setDefaultPosition(CSToastPositionBottom);
        break;
    }

    return this;
  }

  setToastDuration(value: ToastDuration) {
    switch (value) {
      case ToastDuration.SHORT:
        CSToastManager.setDefaultDuration(2.0);
        break;
      case ToastDuration.LONG:
        CSToastManager.setDefaultDuration(4.0);
        break;
      default:
        CSToastManager.setDefaultDuration(2.0);
        break;
    }

    return this;
  }

  private static _getView(): any {
    if (!frameModule.topmost()) {
      throw new Error('There is no topmost');
    } else {
      let viewController = frameModule.topmost().viewController;
      if (viewController.presentedViewController) {
        // on iPad, we don't want to show the toast in the modal, but on iPhone we do
        if (device.deviceType !== DeviceType.Tablet) {
          while (viewController.presentedViewController) {
            viewController = viewController.presentedViewController;
          }
        }
      }
      return viewController.view;
    }
  }
}
