import * as app from "application";
declare var android;
export class Toasty {
    private _text: string;
    private _duration;
    private _toast: any;
    private _position;
    private SHORT = 2000;
    private LONG = 3500;
    constructor(text: string, duration?: any, position?: any) {
        this._text = text;
        this.duration = duration;
        this._toast = android.widget.Toast.makeText(app.android.context, text, 2000);
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
                this._duration = this.SHORT;
        }
    }
    get duration() {
        return this._duration;
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
                this._toast.setGravity(android.view.Gravity.TOP, 0, 0);
                break;
            case "center":
                this._toast.setGravity(android.view.Gravity.CENTER, 0, 0);
                break;
            case "bottom":
                this._toast.setGravity(android.view.Gravity.BOTTOM, 0, 0);
                break;
            default:
                this._toast.setGravity(android.view.Gravity.BOTTOM, 0, 0);
                break;
        }
    }
    show() {
        if (!this._text) {
            throw new Error("Text is not set");
        }
        else {
            this._toast.setDuration(this.duration);
            this._toast.show();
        }
    }
    cancel() {
        if(this._toast) {
            this._toast.cancel();
        }
    }
}