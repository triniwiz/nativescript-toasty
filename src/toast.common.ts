import { Color } from 'tns-core-modules/color';

export enum ToastDuration {
  'SHORT' = 'short',
  'LONG' = 'long'
}

export enum ToastPosition {
  'BOTTOM' = 'bottom',
  'CENTER' = 'center',
  'TOP' = 'top'
}

export interface ToastyOptions {
  /**
   * Message text of the Toast.
   */
  text: string;

  /**
   * Duration to show the Toast.
   */
  duration?: ToastDuration;

  /**
   * Position of the Toast.
   */
  position?: ToastPosition;

  /**
   * Text color of the Toast message.
   */
  textColor?: Color | string;

  /**
   * Background Color of the Toast.
   */
  backgroundColor?: Color | string;

  /**
   * Android specific configuration options.
   */
  android?: { yAxisOffset: number };

  /**
   * iOS Specific configuration options.
   */
  ios?: {
    /**
     * The native iOS view to anchor the Toast to.
     */
    anchorView?: any;

    /**
     * The number of lines to allow for the toast message.
     */
    messageNumberOfLines?: number;

    /**
     * The corner radius of the Toast.
     */
    cornerRadius?: number;

    /**
     * True to display a shadow for the Toast.
     */
    displayShadow?: boolean;

    /**
     * The color of the shadow. Only visible if `displayShadow` is true.
     */
    shadowColor?: Color | string;
  };
}
