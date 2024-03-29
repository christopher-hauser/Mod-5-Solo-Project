import Cookies from 'js-cookie';

export async function csrfFetch(url, options = {}) {
    options.method = options.method || 'GET';
    options.headers = options.headers || {};
    url = process.env.NODE_ENV === 'development' ? url : `https://aa-rarebnb.onrender.com${url}`;

    const res = await window.fetch('/csrf').then(csrf => {
        return csrf.body.csrfToken;
    }).then(csrfRes => {

        if (options.method.toUpperCase() !== 'GET') {
            if (options.headers["Content-Type"] === "multipart/form-data") {
                delete options.headers["Content-Type"];
            } else {
                options.headers["Content-Type"] =
                    options.headers["Content-Type"] || "application/json";
            }
            options.headers['XSRF-Token'] = csrfRes;
        }

        return window.fetch(url, options);
    });

    if (res.status >= 400) throw res;

    return res;
}

export function restoreCSRF() {
    return csrfFetch('/api/csrf/restore');
}
