import { HttpInterceptorFn } from '@angular/common/http';

const urlInterceptor: HttpInterceptorFn = (req, next) => {
  const newReq = req.clone({
    url: `http://${window.location.hostname}:8080/${req.url}`,
  });
  return next(newReq);
};

export default urlInterceptor;
