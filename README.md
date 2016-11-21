# NativeScript-Toasty

[![npm](https://img.shields.io/npm/v/nativescript-toasty.svg)](https://www.npmjs.com/package/nativescript-toasty)
[![npm](https://img.shields.io/npm/dt/nativescript-toasty.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-toasty)

## Install
`tns plugin add nativescript-toasty`

## Usage

TypeScript

```js
import {Toasty} from 'nativescript-toasty'
const toast = new Toasty("Toast message");
toast.show();
```

JavaScript
```js
var toasty = require('nativescript-toast').Toasty;
var toast = new toasty("Toast message");
toast.show();
```

##Config

`Toasty(message:string, duration?:string, position?:string);`

```
duration = "short | long";
position = "bottom | center | top";
```
