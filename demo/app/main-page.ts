import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';
import { Toasty } from 'nativescript-toasty';
// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
  // Get the event sender
  let page = <Page>args.object;
  page.bindingContext = new HelloWorldModel();
}

export function shortToast() {
  const toast = new Toasty("Short Toast");
  toast.show();
}
export function longToast() {
  const toast = new Toasty("Long Toast", "long");
  toast.show();
}
export function positionToast() {
  const toast = new Toasty("Position Toast", null, "center");
  toast.show();
}
