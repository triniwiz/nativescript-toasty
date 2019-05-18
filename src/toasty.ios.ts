/// <reference path="./typings/objc!Toast.d.ts" />

import { device } from 'tns-core-modules/platform';
import { DeviceType } from 'tns-core-modules/ui/enums';
import * as frameModule from 'tns-core-modules/ui/frame';
import { ToastDuration, ToastPosition } from './toast.common';
export * from './toast.common';

export class Toasty {
  private _duration: ToastDuration;
  private _position: ToastPosition;
  private _text: string;
  constructor(
    text: string,
    duration?: ToastDuration,
    position?: ToastPosition
  ) {
    this._text = text;

    // set the position and duration of the toast
    this.setToastPosition(position);
    this.setToastDuration(duration);

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
      throw new Error('Text is not set');
    } else {
      Toasty.getView().makeToast(this._text);
    }
  }

  cancel() {
    Toasty.getView().hideToasts();
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

  private static getView(): any {
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
