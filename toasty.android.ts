import * as app from "application";
export class Toasty {
    private _text: string;
    private _duration;
    private _toast;
    private SHORT = 2000;
    private 
    constructor(text: string) {
        this._text = text;
    }
    set duration(value: string) {
        switch(value){
            case "short":
            this._duration = 2000;
            break;
            case "long":
            this._duration = 3500;
            default:
            this.duration
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
    show() {
        if (!this._text) {
            throw new Error("Text is not set")
        }
        else {
            if(!this.duration){
                this.duration = "2.5"
            }
            this._toast = android.widget.Toast.makeText(app.android.context, this.text,this._duration)
        }
    }
}