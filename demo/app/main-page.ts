import { ToastDuration, ToastPosition, Toasty } from 'nativescript-toasty';

export function shortToast() {
  new Toasty('Short Toast').show();
}

export function longToast() {
  new Toasty('Long Toast', ToastDuration.LONG)
    .setToastPosition(ToastPosition.BOTTOM)
    .show();
}

export function chainedToast() {
  new Toasty('Chained Toast Methods')
    .setToastDuration(ToastDuration.LONG)
    .setToastPosition(ToastPosition.CENTER)
    .show();
}

export function positionToast() {
  const toast = new Toasty('Position Toast');
  console.log('setting position');
  toast.position = ToastPosition.TOP;
  toast.duration = ToastDuration.SHORT;
  toast.show();
}

export function cancelToast() {
  const toast = new Toasty('Canceling after 1 sec');
  toast.show();
  setTimeout(() => {
    toast.cancel();
  }, 1000);
}
