/* eslint max-len:0 , space-in-parens:0*/
import jsCookie from 'js-cookie';

export default class isSEA {
  constructor(paramName = 'gclid', cookieName = 'isSEA', expires = 90) {
    var param;

    this.cookieName = cookieName;
    this.paramName = paramName;
    param = this._get(this.paramName);

    if (param) {
      jsCookie.set(this.cookieName, JSON.stringify({ gclid: param }), { expires: expires });
      return true;
    }
    return false;
  }

  bool() {
    try {
      if (jsCookie.get(this.cookieName) && Object.keys(jsCookie.get(this.cookieName)).length !== 0) {
        return true;
      }
      return false;
    } catch (err) {
      console.log('Incompatible Browser');
      return false;
    }
  }

  gclid() {
    var gclid;

    try {

      if (jsCookie.get(this.cookieName) && Object.keys(jsCookie.get(this.cookieName)).length !== 0) {
        gclid = JSON.parse(jsCookie.get(this.cookieName)).gclid;
        if (gclid) {
          return gclid;
        }
        return false;
      }
      return false;
    } catch (err) {
      console.log('Incompatible Browser');
      return false;
    }
  }

  _get(param) {
    var vars = {};

    window.location.href.replace(
    /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
       (m, key, value) => {
         vars[key] = value !== undefined ? value : '';
       }
	);

    if (param) {
      return vars[param] ? vars[param] : null;
    }

    return vars;
  }
}
