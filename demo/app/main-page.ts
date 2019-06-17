import { ToastDuration, ToastPosition, Toasty } from 'nativescript-toasty';
import { Color } from 'tns-core-modules/color/color';

export function shortToast() {
  new Toasty('Short Toast').show();
}

export function longToast() {
  new Toasty('Long Toast with Red Text', ToastDuration.LONG)
    .setTextColor(new Color('white'))
    .setToastPosition(ToastPosition.NO_SETTING)
    .setBackgroundColor('#ff9999')
    .show();
}

export function chainedToast() {
  const t = new Toasty('Chained Toast Methods')
    .setToastDuration(ToastDuration.LONG)
    .setToastPosition(ToastPosition.CENTER)
    .setTextColor('blue');
  t.backgroundColor = 'white';
  t.show();
}

export function positionToast() {
  const toast = new Toasty('Position Toast');
  toast.position = ToastPosition.BOTTOM;
  toast.duration = ToastDuration.SHORT;
  toast.textColor = 'black';
  toast.backgroundColor = new Color('#fff000');
  toast.show();
}

export function cancelToast() {
  const toast = new Toasty('Canceling after 1 sec').setToastPosition(
    ToastPosition.CENTER
  );
  toast.show();
  setTimeout(() => {
    toast.cancel();
  }, 1000);
}
