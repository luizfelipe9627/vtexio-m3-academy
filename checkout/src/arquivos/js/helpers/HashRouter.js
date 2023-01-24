/**
 * Helper de para ultização de eventos sobre a navegação por hash
 */

export default class HashRouter {
    constructor(routes) {
        this.routes = routes;
        window.addEventListener("hashchange", this.hashChange.bind(this));
        this.init();
    }

    hashChange(e) {
        const from = new URL(e.oldURL).hash || "/";
        const to = new URL(e.newURL).hash || "/";

        this.routes.forEach((route) => {
            if (route.path === to) {
                route.onEnter && route.onEnter();
            } else if (route.path === from) {
                route.onLeave && route.onLeave();
            }
        });
    }

    init() {
        const actualHash = window.location.hash || "/";

        this.routes.forEach((route) => {
            if (route.path === actualHash) {
                route.onEnter && route.onEnter();
            }
        });
    }
}
