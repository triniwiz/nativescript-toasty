import * as app from 'tns-core-modules/application';
import { ToastDuration, ToastPosition } from './toast.common';
export * from './toast.common';

declare var CSToastManager,
  CSToastPositionTop,
  CSToastPositionCenter,
  CSToastPositionBottom;

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
      app.ios.rootController.view.makeToast(this._text);
    }
  }

  cancel() {
    app.ios.rootController.view.hideToasts();
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
}
