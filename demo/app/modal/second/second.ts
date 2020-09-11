import { Frame } from '@nativescript/core';
import { Toasty } from 'nativescript-toasty';

export function modalToast() {
  new Toasty({
    text: 'Second Modal'
  }).show();
}

export function navigate() {
  Frame.topmost().navigate('~/modal/third/third');
}

export function close(args) {
  args.object.closeModal();
}
