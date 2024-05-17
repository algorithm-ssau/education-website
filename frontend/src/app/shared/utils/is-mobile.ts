import { concat, fromEvent, map, of, shareReplay } from 'rxjs';

export default function CheckMobile(): PropertyDecorator {
  const isMobileFirst = of(window.innerWidth <= 500);
  const isMobileRest = fromEvent(window, 'resize').pipe(
    map(() => window.innerWidth <= 500),
    shareReplay(1),
  );
  return (target, propertyKey) => {
    Object.defineProperty(target, propertyKey, {
      get() {
        return concat(isMobileFirst, isMobileRest);
      },
    });
  };
}
