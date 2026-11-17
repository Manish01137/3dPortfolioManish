// Tiny store: lets hero animations wait for the preloader.
let ready = false;
const subs = new Set<() => void>();
export const isReady = () => ready;
export function setReady() {
  if (ready) return;
  ready = true;
  subs.forEach((f) => f());
  subs.clear();
}
export function whenReady(cb: () => void) {
  if (ready) {
    cb();
    return () => {};
  }
  subs.add(cb);
  return () => subs.delete(cb);
}
