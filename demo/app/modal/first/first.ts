import { Toasty } from 'nativescript-toasty';
import { topmost } from 'ui/frame';

let page;

export function modalToast() {
    new Toasty({
        text: 'First Toast'
    }).show();
}

export function onPageLoaded(args) {
    console.log(args.object.frame)
}

export function navigate(args) {
    topmost().navigate('~/modal/second/second')
}

export function close(args) {
    args.object.closeModal()
}
