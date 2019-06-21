import { Color } from 'tns-core-modules/color';
import { device } from 'tns-core-modules/platform';
import { DeviceType } from 'tns-core-modules/ui/enums';
import * as frameModule from 'tns-core-modules/ui/frame';
import { ToastDuration, ToastPosition, ToastyOptions } from './toast.common';
export * from './toast.common';

export class Toasty {
  private _text: string;
  private _duration: ToastDuration;
  private _position: ToastPosition;
  private _textColor: Color | string;
  private _backgroundColor: Color | string;
  private _iOSOpts: ToastyOptions['ios'];
  private _csToaststyle: CSToastStyle;

  constructor(opts?: ToastyOptions) {
    this._csToaststyle = CSToastStyle.alloc().initWithDefaultStyle();

    // set the default constructor args for private members
    this._text = opts.text;
    this._duration = opts.duration;
    this._position = opts.position;
    this._textColor = opts.textColor;
    this._backgroundColor = opts.backgroundColor;
    this._iOSOpts = opts.ios || {};

    // set the defaults for the toasty, if passed in constructor those values are used
    this.setToastDuration(this._duration)
      .setToastPosition(this._position)
      .setTextColor(this._textColor)
      .setBackgroundColor(this._backgroundColor);

    // check ios configuration
    // if displaying shadow also check if user wants to change default shadow color
    if (this._iOSOpts.displayShadow) {
      this._csToaststyle.displayShadow = this._iOSOpts.displayShadow;
      if (this._iOSOpts.shadowColor) {
        if (typeof this._iOSOpts.shadowColor === 'string') {
          this._csToaststyle.shadowColor = new Color(
            this._iOSOpts.shadowColor
          ).ios;
        } else {
          this._csToaststyle.shadowColor = this._iOSOpts.shadowColor.ios;
        }
      }
    }

    if (this._iOSOpts.cornerRadius) {
      this._csToaststyle.cornerRadius = this._iOSOpts.cornerRadius;
    }
    if (this._iOSOpts.messageNumberOfLines) {
      this._csToaststyle.messageNumberOfLines = this._iOSOpts.messageNumberOfLines;
    }

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
      this._getView().makeToast(this._text);
    }
  }

  cancel() {
    this._getView().hideToasts();
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

  private _getView(): any {
    if (!frameModule.topmost()) {
      throw new Error('There is no topmost');
    } else {
      // if the user provided an iOSOpts.anchorView then we're going to use it as the anchor when making the toast
      if (this._iOSOpts && this._iOSOpts.anchorView) {
        return this._iOSOpts.anchorView;
      } else {
        // if no anchorView requested we'll use the viewController view (might look into using the .window of the main VC later)
        let viewController = frameModule.topmost()
          .viewController as UIViewController;
        if (viewController.presentedViewController) {
          // on iPad, we don't want to show the toast in the modal, but on iPhone we do
          if (device.deviceType !== DeviceType.Tablet) {
            while (viewController.presentedViewController) {
              viewController = viewController.presentedViewController;
            }
          }
        }
        return viewController.view.window;
      }
    }
  }
}
