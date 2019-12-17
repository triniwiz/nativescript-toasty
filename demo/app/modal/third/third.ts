import { Toasty } from 'nativescript-toasty';
import { topmost } from 'ui/frame';

export function modalToast() {
    new Toasty({
        text: 'Third Toast'
    }).show();
}

export function navigate() {
    topmost().navigate('~/modal/fourth/fourth');
}

export function close(args) {
    args.object.closeModal()
}
