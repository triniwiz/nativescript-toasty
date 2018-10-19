export declare class Toasty {
  constructor(text: string, duration?: ToastDuration, position?: ToastPosition);

  /**
   * Shows the toast message.
   */
  show(): void;
  cancel(): void;

  /**
   * Sets the position of the toast.
   * @param value [ToastPosition] - Position of toast.
   */
  setToastPosition(value: ToastPosition): this;

  /**
   * Sets the duration of the toast.
   * @param value [ToastDuration] - Duration of toast.
   */
  setToastDuration(value: ToastDuration): this;
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
