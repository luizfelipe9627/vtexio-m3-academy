export default class ExempleEvent {
    constructor() {
        this.eventos();
    }
    eventos() {
        $(window).on("orderFormUpdated.vtex", this.onUpdate.bind(this));
    }

    onUpdate(orderForm) {
        console.log(orderForm);
    }
}
