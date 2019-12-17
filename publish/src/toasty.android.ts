import { Color } from 'tns-core-modules/color';
import { screen } from 'tns-core-modules/platform';
import { ad as androidUtils } from 'tns-core-modules/utils/utils';
import { ToastDuration, ToastPosition, ToastyOptions } from './toast.common';
import { Length } from 'tns-core-modules/ui/styling/style-properties';
import { isNullOrUndefined } from 'tns-core-modules/utils/types';
import { android as androidApp } from 'tns-core-modules/application';

export * from './toast.common';

export class Toasty {
    private _position: ToastPosition;
    private _duration: ToastDuration;
    private _text: string;
    private _backgroundColor;
    private _textColor;
    private _androidOpts: any;
    private _toast: android.widget.Toast;
    private _screenHeight: number;
    private _screenWidth: number;
    private _x: Length | number;
    private _y: Length | number;
    private _tapToDismiss: boolean;
    private _anchorView: any;

    constructor(opts?: ToastyOptions) {
        this._screenHeight = screen.mainScreen.heightPixels;
        this._screenWidth = screen.mainScreen.widthPixels;
        this._text = opts?.text;
        this._duration = opts?.duration ?? ToastDuration.SHORT;
        this._position = opts?.position ?? ToastPosition.BOTTOM;
        this._textColor = opts?.textColor ?? 'white';
        this._backgroundColor = opts?.backgroundColor ?? 'black';
        this._androidOpts = opts?.android ?? {};
        this._x = opts?.xAxisOffset;
        this._y = opts?.yAxisOffset;
        this._tapToDismiss = opts?.tapToDismiss ?? false;
        this._anchorView = opts?.anchorView;
        // create the android Toast
        this._toast = android.widget.Toast.makeText(
            androidUtils.getApplicationContext(),
            this._text,
            android.widget.Toast.LENGTH_SHORT
        );
        const ref = new WeakRef<Toasty>(this);
        this._toast.getView().setOnTouchListener(new android.view.View.OnTouchListener({
            onTouch(param0: android.view.View, param1: android.view.MotionEvent): boolean {
                if (ref.get()?._tapToDismiss) {
                    ref.get()?._toast?.cancel();
                }
                return false;
            }
        }));

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

    set xAxisOffset(value: Length | number) {
        this._x = value;
        this._updateToastPosition();
    }

    set yAxisOffset(value: Length | number) {
        this._y = value;
        this._updateToastPosition();
    }

    get xAxisOffset(): Length | number {
        return this._x;
    }

    get yAxisOffset(): Length | number {
        return this._y;
    }

    private static isLength(value) {
        return value && !isNullOrUndefined(value.unit) && !isNullOrUndefined(value.value);
    }

    private get yPixels(): number | undefined {
        let y;
        if (typeof this._y === 'number') {
            y = this._y * screen.mainScreen.scale;
        }

        if (Toasty.isLength(this._y)) {
            if ((this._y as any).unit === 'px') {
                y = (this._y as any).value;
            }
            if ((this._y as any).unit === 'dip') {
                y = (this._y as any).value * screen.mainScreen.scale;
            }
        }

        if (typeof this._y === 'string') {
            if (this._y.includes('px')) {
                y = parseInt(this._y.replace('px', ''), 0);
            }
            if (this._y.includes('dip')) {
                y = parseInt(this._y.replace('dip', ''), 0) * screen.mainScreen.scale;
            }
        }

        return y;
    }

    private get xPixels(): number | undefined {
        let x;
        if (typeof this._x === 'number') {
            x = this._x * screen.mainScreen.scale;
        }

        if (Toasty.isLength(this._x)) {
            if ((this._x as any).unit === 'px') {
                x = (this._x as any).value;
            }
            if ((this._x as any).unit === 'dip') {
                x = (this._x as any).value * screen.mainScreen.scale;
            }
        }

        if (typeof this._x === 'string') {
            if (this._x.includes('px')) {
                x = parseInt(this._x.replace('px', ''), 0);
            }
            if (this._x.includes('dip')) {
                x = parseInt(this._x.replace('dip', ''), 0) * screen.mainScreen.scale;
            }
        }

        return x;
    }

    show() {
        if (!this._text) {
            throw new Error('Toasty Text is not set.');
        } else {
            this._toast?.show();
        }
    }

    private _measureToast() {
        const window = (androidApp.foregroundActivity || androidApp.startActivity)?.getWindow();
        let metrics = new android.util.DisplayMetrics();
        window?.getWindowManager().getDefaultDisplay().getMetrics(metrics);
        const MeasureSpec = android.view.View.MeasureSpec;
        const widthMeasureSpec = MeasureSpec.makeMeasureSpec(metrics.widthPixels, MeasureSpec.UNSPECIFIED);
        const heightMeasureSpec = MeasureSpec.makeMeasureSpec(metrics.heightPixels, MeasureSpec.UNSPECIFIED);
        this._toast?.getView().measure(widthMeasureSpec, heightMeasureSpec);
    }

    get width() {
        this._measureToast();
        return this._toast?.getView().getMeasuredWidth() / screen.mainScreen.scale ?? 0;
    }

    get height() {
        this._measureToast();
        return this._toast?.getView().getMeasuredHeight() / screen.mainScreen.scale ?? 0;
    }

    cancel() {
        this._toast?.cancel();
    }

    setTextColor(value: Color | string) {
        if (value) {
            this._textColor = value;
            const view = this._toast?.getView();
            const text = view?.findViewById(
                android.R.id.message
            ) as android.widget.TextView;
            // set the text color
            if (typeof value === 'string') {
                const nativeColor = new Color(value).android;
                text?.setTextColor(nativeColor);
            } else {
                text?.setTextColor(value.android);
            }
        }

        return this;
    }

    setBackgroundColor(value: Color | string) {
        if (value) {
            this._backgroundColor = value;
            const view = this._toast?.getView();
            if (typeof value === 'string') {
                const nativeColor = new Color(value).android;
                view?.setBackgroundColor(nativeColor);
            } else {
                view?.setBackgroundColor(value.android);
            }
        }

        return this;
    }

    setToastDuration(value: ToastDuration) {
        switch (value) {
            case ToastDuration.SHORT:
                this._toast?.setDuration(android.widget.Toast.LENGTH_SHORT);
                break;
            case ToastDuration.LONG:
                this._toast?.setDuration(android.widget.Toast.LENGTH_LONG);
                break;
            default:
                this._toast?.setDuration(android.widget.Toast.LENGTH_SHORT);
                break;
        }

        return this;
    }

    setToastPosition(value: ToastPosition) {
        this._position = value;
        this._updateToastPosition();
        return this;
    }

    private _updateToastPosition() {
        let yOffset = this.yPixels ?? 0;
        let xOffset = this.xPixels ?? 0;
        switch (this._position) {
            case ToastPosition.TOP:
                this._toast?.setGravity(android.view.Gravity.TOP, xOffset, yOffset);
                break;
            case ToastPosition.TOP_LEFT:
                this._toast?.setGravity(android.view.Gravity.TOP | android.view.Gravity.LEFT, xOffset, yOffset);
                break;
            case ToastPosition.TOP_RIGHT:
                this._toast?.setGravity(android.view.Gravity.TOP | android.view.Gravity.RIGHT, xOffset, yOffset);
                break;
            case ToastPosition.CENTER:
                this._toast?.setGravity(android.view.Gravity.CENTER, xOffset, yOffset);
                break;
            case ToastPosition.CENTER_LEFT:
                this._toast?.setGravity(android.view.Gravity.CENTER | android.view.Gravity.LEFT, xOffset, yOffset);
                break;
            case ToastPosition.CENTER_RIGHT:
                this._toast?.setGravity(android.view.Gravity.CENTER | android.view.Gravity.RIGHT, xOffset, yOffset);
                break;
            case ToastPosition.BOTTOM:
                this._toast?.setGravity(android.view.Gravity.BOTTOM, xOffset, yOffset);
                break;
            case ToastPosition.BOTTOM_LEFT:
                this._toast?.setGravity(android.view.Gravity.BOTTOM | android.view.Gravity.LEFT, xOffset, yOffset);
                break;
            case ToastPosition.BOTTOM_RIGHT:
                this._toast?.setGravity(android.view.Gravity.BOTTOM | android.view.Gravity.RIGHT, xOffset, yOffset);
                break;
            default:
                break;
        }
    }
}
