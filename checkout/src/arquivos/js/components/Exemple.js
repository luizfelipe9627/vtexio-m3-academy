import waitForEl from "../helpers/waitForEl";

export default class Exemple {
    constructor() {
        this.init();
    }

    async init() {
        await this.selectors();
        console.log(this.item);
    }

    async selectors() {
        this.item = await waitForEl(
            ".summary-cart-template-holder .cart-items"
        );
    }
}
