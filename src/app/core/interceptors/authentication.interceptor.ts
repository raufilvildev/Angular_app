import { HttpInterceptorFn } from '@angular/common/http';

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    const reqClone = req.clone({
      setHeaders: {
        Authorization: accessToken,
      },
    });
    return next(reqClone);
  }

  return next(req);
};
