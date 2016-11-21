import * as app from "application";
declare var CSToastManager, CSToastPositionTop, CSToastPositionCenter, CSToastPositionBottom;
export class Toasty {
    private _text: string;
    private _duration;
    private _toast;
    private _position;
    private SHORT = 2.0;
    private LONG = 3.5
    constructor(text: string, duration?: any, position?: any) {
        this._text = text;
        this.duration = duration;
        this.position = position;
    }
    set duration(value: any) {
        switch (value) {
            case "short":
                this._duration = this.SHORT;
                break;
            case "long":
                this._duration = this.LONG;
            default:
                this._duration = this.SHORT
        }
    }
    set text(value: string) {
        this._text = value;
    }
    get text(): string {
        return this._text;
    }
    set position(value) {
        switch (value) {
            case "top":
                this._position = CSToastPositionTop;
                break;
            case "center":
                this._position = CSToastPositionCenter;
                break;
            case "bottom":
                this._position = CSToastPositionBottom;
                break;
            default:
                this._position = CSToastPositionBottom;
                break;
        }
    }
    show() {
        if (!this._text) {
            throw new Error("Text is not set")
        }
        else {
            CSToastManager.setDefaultDuration(this._duration);
            CSToastManager.setDefaultPosition(this._position)
            this._toast = app.ios.rootController.view.makeToast(this.text);
        }
    }
    cancel() {
        if(this._toast) {
            this._toast.self.cs_hideToast(this._toast);
        }
    }
}
