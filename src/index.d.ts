export declare class Toasty {
  constructor(text: string, duration?: ToastDuration, position?: ToastPosition);
  show(): void;
  cancel(): void;
}

export enum ToastDuration {
  'SHORT' = 'short',
  'LONG' = 'long'
}

export enum ToastPosition {
  'BOTTOM' = 'bottom',
  'CENTER' = 'center',
  'TOP' = 'top'
}
