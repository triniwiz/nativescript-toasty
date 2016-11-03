export declare class Toasty {
    private _text;
    private _duration;
    private _toast;
    private _position;
    private SHORT;
    private LONG;
    constructor(text: string, duration?: any, position?: any);
    duration: any;
    text: string;
    position: any;
    show(): void;
    cancel(): void;
}
