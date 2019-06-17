export declare class Toasty {
  constructor(
    text: string,
    duration?: ToastDuration,
    position?: ToastPosition,
    textColor?: Color | string,
    backgroundColor?: Color | string
  );
  position: ToastPosition;
  duration: ToastDuration;
  textColor: Color | string;
  backgroundColor: Color | string;

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

  /**
   * Set the text color of the toast.
   * @param value [Color | string] - Color of the string message.
   */
  setTextColor(value: Color | string): this;

  /**
   * Set the background color of the toast.
   * @param value [Color |  string] - Color of the background.
   */
  setBackgroundColor(value: Color | string): this;
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
