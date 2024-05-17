import { debounceTime, fromEvent, map } from 'rxjs';

export default function CheckMobile(): PropertyDecorator {
  const isMobile = fromEvent(window, 'resize').pipe(
    debounceTime(100),
    map(() => window.innerWidth <= 500),
  );
  return (target, propertyKey) => {
    Object.defineProperty(target, propertyKey, {
      get() {
        return isMobile;
      },
    });
  };
}
