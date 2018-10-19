import { ToastDuration, ToastPosition, Toasty } from 'nativescript-toasty';

export function shortToast() {
  new Toasty('Short Toast').show();
}

export function longToast() {
  new Toasty('Long Toast', ToastDuration.LONG).show();
}

export function positionToast() {
  const toast = new Toasty(
    'Position Toast',
    ToastDuration.SHORT,
    ToastPosition.CENTER
  );
  toast.show();
}
