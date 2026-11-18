// Tiny store: lets intro animations wait for the preloader (first load)
// or for the page-transition reveal (client-side navigation).
let ready = false;
const subs = new Set<() => void>();
export const isReady = () => ready;
export function setReady() {
  if (ready) return;
  ready = true;
  const queued = [...subs];
  subs.clear();
  queued.forEach((f) => f());
}
/** Called when a page transition starts covering the screen: new pages hold their intros until setReady(). */
export function holdReady() {
  ready = false;
}
export function whenReady(cb: () => void) {
  if (ready) {
    cb();
    return () => {};
  }
  subs.add(cb);
  return () => subs.delete(cb);
}
