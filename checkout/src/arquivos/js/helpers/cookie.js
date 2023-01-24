/* eslint-disable no-useless-escape */
import cookie from "cookie";
class Cookie {
    get(sKey) {
        if (!sKey) {
            return null;
        }

        const cookies = cookie.parse(document.cookie);
        return cookies[sKey] || null;
    }

    set(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
            return false;
        }
        var sExpires = "";
        if (vEnd) {
            switch (vEnd.constructor) {
                case Number:
                    sExpires =
                        vEnd === Infinity
                            ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT"
                            : "; max-age=" + vEnd;
                    break;
                case String:
                    sExpires = "; expires=" + vEnd;
                    break;
                case Date:
                    sExpires = "; expires=" + vEnd.toUTCString();
                    break;
            }
        }

        document.cookie =
            encodeURIComponent(sKey) +
            "=" +
            encodeURIComponent(sValue) +
            sExpires +
            (sDomain ? "; domain=" + sDomain : "") +
            (sPath ? "; path=" + sPath : "") +
            (bSecure ? "; secure" : "");

        return true;
    }

    delete(sKey, sPath, sDomain) {
        if (!this.hasItem(sKey)) {
            return false;
        }
        document.cookie =
            encodeURIComponent(sKey) +
            "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" +
            (sDomain ? "; domain=" + sDomain : "") +
            (sPath ? "; path=" + sPath : "");
        return true;
    }

    has(sKey) {
        if (!sKey) {
            return false;
        }
        return new RegExp(
            "(?:^|;\\s*)" +
                encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") +
                "\\s*\\="
        ).test(document.cookie);
    }

    keys() {
        return cookie.parse(document.cookie);
    }
}

export default new Cookie();
