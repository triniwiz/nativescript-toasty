# NativeScript-Toasty

[![npm](https://img.shields.io/npm/v/nativescript-toasty.svg)](https://www.npmjs.com/package/nativescript-toasty)
[![npm](https://img.shields.io/npm/dt/nativescript-toasty.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-toasty)

## Install

`tns plugin add nativescript-toasty`

## Usage

TypeScript

```js
import { Toasty } from 'nativescript-toasty';
const toast = new Toasty('Toast message');
toast.show();

// you can also chain the methods together and there's no need to create a reference to the Toasty instance with this approach
new Toasty('Some Message')
  .setToastDuration(ToastDuration.LONG)
  .setToastPosition(ToastPosition.BOTTOM)
  .setTextColor(new Color('white'))
  .setBackgroundColor('#ff9999')
  .show();

// or you can set the properties of the Toasty instance
const toasty = new Toasty('Somethign something...');
toasty.position = ToastPosition.CENTER;
toasty.duration = ToastDuration.SHORT;
toasty.textColor = '#fff';
toasty.backgroundColor = new Color('purple');
toasty.show();
```

JavaScript

```js
var toasty = require('nativescript-toasty').Toasty;
var toast = new toasty('Toast message');
toast.show();
```

### API

```typescript

 constructor(
    text: string,
    duration?: ToastDuration,
    position?: ToastPosition,
    textColor?: Color | string,
    backgroundColor?: Color | string
  )

  /**
   * Show the Toasty
   */
  show();

  /**
   * Cancels the Toasty
   */
  cancel();

/**
 * Sets the Toast position.
 */
  setToastPosition(value: ToastPosition): Toasty;

/**
 * Sets the Toast duration.
 */
  setToastDuration(value: ToastDuration): Toasty;

/**
  * Set the text color of the toast.
  * @param value [Color | string] - Color of the string message.
  */
  setTextColor(value: Color | string): Toasty;

/**
  * Set the background color of the toast.
  * @param value [Color |  string] - Color of the background.
  */
  setBackgroundColor(value: Color | string): Toasty;
```

```typescript
export enum ToastDuration {
  'SHORT',
  'LONG'
}

export enum ToastPosition {
  'BOTTOM',
  'CENTER',
  'TOP'
}
```
