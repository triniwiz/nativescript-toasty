import { ToastDuration, ToastPosition, Toasty } from 'nativescript-toasty';
import { Color } from 'tns-core-modules/color';
import { screen } from 'tns-core-modules/platform';
import { topmost } from 'tns-core-modules/ui/frame';

export function shortToast() {
  new Toasty({
    text: 'Default Toast Settings'
  }).show();
}

export function longToast() {
  new Toasty({
    text:
      'Long Toast with Red Text and BOTTOM position with Y-Axis Offset for Android.',
    duration: ToastDuration.LONG,
    position: ToastPosition.BOTTOM,
    textColor: new Color('white'),
    backgroundColor: '#ff9999',
    android: {
      yAxisOffset: screen.mainScreen.heightDIPs * 0.35
    },
    ios: {
      anchorView: null
    }
  }).show();
}

export function positionToast(args) {
  const toast = new Toasty({
    text:
      'Position TOP Toast with SHORT duration. Anchored to ActionBar for iOS.',
    ios: {
      // anchorView: args.object.ios
      anchorView: topmost().currentPage.actionBar.ios,
      displayShadow: true,
      shadowColor: new Color('green'),
      messageNumberOfLines: 4,
      cornerRadius: 25
    }
  });
  toast.position = ToastPosition.TOP;
  toast.duration = ToastDuration.SHORT;
  toast.textColor = 'black';
  toast.backgroundColor = new Color('#fff000');
  toast.show();
}

export function chainedToast() {
  const t = new Toasty({ text: 'Chained Toast Methods Toast' })
    .setToastDuration(ToastDuration.LONG)
    .setToastPosition(ToastPosition.CENTER)
    .setTextColor('yellow');
  t.show();
}

export function cancelToast() {
  const toast = new Toasty({ text: 'Canceling after 1 sec' }).setToastPosition(
    ToastPosition.BOTTOM
  );
  toast.show();
  setTimeout(() => {
    toast.cancel();
  }, 1000);
}
