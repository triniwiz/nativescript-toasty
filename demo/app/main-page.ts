import { Color, Frame, isIOS } from '@nativescript/core';
import { ToastDuration, ToastPosition, Toasty } from 'nativescript-toasty';

export function openModal(args) {
  args.object.showModal('~/modal/modal-root', {
    closeCallback: args => {},
    context: {},
    fullscreen: true
  });
}

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
    anchorView: null,
    yAxisOffset: 10,
    tapToDismiss: true,
    android: {}
  }).show();
}

export function positionToast(args) {
  const toast = new Toasty({
    text:
      'Position TOP Toast with SHORT duration. Anchored to ActionBar for iOS.',
    ios: {
      displayShadow: true,
      shadowColor: new Color('green'),
      messageNumberOfLines: 4,
      cornerRadius: 25
    },
    yAxisOffset: 10,
    xAxisOffset: 10,
    anchorView: isIOS
      ? Frame.topmost().currentPage.actionBar.ios
      : Frame.topmost().currentPage.actionBar.nativeView
  });
  toast.position = ToastPosition.CENTER;
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
