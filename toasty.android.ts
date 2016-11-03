import * as app from "application";
export class Toasty {
    private _text: string;
    private _duration;
    private _toast: android.widget.Toast;
    private _position;
    private SHORT = 2000;
    private LONG = 3500;
    constructor(text: string, duration?: any) {
        this._text = text;
        this.duration = duration;
        this._toast = new android.widget.Toast(app.android.context);
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
            throw new Error("Text is not set")
        }
        else {
            this._toast.setText(this.text);
            this._toast.setDuration(this.duration);
            this._toast.show();
        }
    }
    cancel() {
        this._toast.cancel();
    }
}