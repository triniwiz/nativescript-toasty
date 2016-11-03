# NativeScript-Toasty

## Install
`tns install nativescript-toasty`

## Usage

TypeScript

```js
import {Toasty} from 'nativescript-toasty'
const toast = new Toasty("Toast message");
toast.show();
```

JavaScript
```js
var toasty = require('nativescript-toast).Toasty;
var toast = new toasty("Toast message");
toast.show();
```

##Config

Toasty(message:string,duration?:string) /* short or long can be used for the duration it is set to short by default*/
