declare class CSToastManager extends NSObject {
  static alloc(): CSToastManager; // inherited from NSObject

  static defaultDuration(): number;

  static defaultPosition(): any;

  static isQueueEnabled(): boolean;

  static isTapToDismissEnabled(): boolean;

  static new(): CSToastManager; // inherited from NSObject

  static setDefaultDuration(duration: number): void;

  static setDefaultPosition(position: any): void;

  static setQueueEnabled(queueEnabled: boolean): void;

  static setSharedStyle(sharedStyle: CSToastStyle): void;

  static setTapToDismissEnabled(tapToDismissEnabled: boolean): void;

  static sharedStyle(): CSToastStyle;
}

declare var CSToastPositionBottom: string;

declare var CSToastPositionCenter: string;

declare var CSToastPositionTop: string;

declare class CSToastStyle extends NSObject {
  static alloc(): CSToastStyle; // inherited from NSObject

  static new(): CSToastStyle; // inherited from NSObject

  activitySize: CGSize;

  backgroundColor: UIColor;

  cornerRadius: number;

  displayShadow: boolean;

  fadeDuration: number;

  horizontalPadding: number;

  imageSize: CGSize;

  maxHeightPercentage: number;

  maxWidthPercentage: number;

  messageAlignment: NSTextAlignment;

  messageColor: UIColor;

  messageFont: UIFont;

  messageNumberOfLines: number;

  shadowColor: UIColor;

  shadowOffset: CGSize;

  shadowOpacity: number;

  shadowRadius: number;

  titleAlignment: NSTextAlignment;

  titleColor: UIColor;

  titleFont: UIFont;

  titleNumberOfLines: number;

  verticalPadding: number;

  constructor(o: { defaultStyle: void });

  initWithDefaultStyle(): this;
}

declare var ToastVersionNumber: number;

declare var ToastVersionString: interop.Reference<number>;
