import { Toasty } from 'nativescript-toasty';
import { topmost } from 'ui/frame';

export function modalToast() {
    new Toasty({
        text: 'Second Modal'
    }).show();
}

export function navigate() {
    topmost().navigate('~/modal/third/third');
}

export function close(args) {
    args.object.closeModal()
}
