import IsAuth from "./IsAuth";

const CheckGuard = (to, from, next) => {
    let isLoggedin = IsAuth();
    if (to.meta.guard === 'auth') {
        if (isLoggedin) {
          next();
        }
        next.redirect('/login');
      } else if (to.meta.guard === 'guest') {
        if (isLoggedin) {
            next.redirect('/');
          }
          next();
      } else {
          next();
      }
}

export default CheckGuard;