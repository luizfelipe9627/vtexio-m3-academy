import { getSalesChannel } from "Helpers/utils";
import { PubSub } from "@agenciam3/pkg/dist/lib/index";
import CartItem from "./CartItem";

export default class CheckoutService {
    constructor() {
        this.eventsName = {
            CHECKOUT_UPDATED: "CHECKOUT_UPDATED",
            ORDERFORM_UPDATED: "ORDERFORM_UPDATED",
        };
        this.events = new PubSub();
        if (window.vtexjs) {
            this.checkout = window.vtexjs.checkout;
            this.orderform = window.vtexjs.checkout.orderForm;
            this.events.subscribe(
                this.eventsName.ORDERFORM_UPDATED,
                this._orderFormUpdated.bind(this)
            );
        }
    }

    _orderFormUpdated(evt, orderForm) {
        const cartItems = this._mapOrderFormToCartItems(orderForm);
        this.events.publish(this.eventsName.CHECKOUT_UPDATED, cartItems);
    }

    async addItemsToCart(items) {
        try {
            return await this.checkout.addToCart(
                items,
                null,
                getSalesChannel()
            );
        } catch (err) {
            console.log(err);
        }
    }

    async rmAllItems() {
        try {
            return await this.checkout.removeAllItems();
        } catch (err) {
            console.log(err);
        }
    }

    async updateCartItemsQtd(items, qtd) {
        try {
            const orderForm = await this.checkout.getOrderForm();
            let itemIndex;
            for (let i = 0; i < orderForm.items.length; i++) {
                if (orderForm.items[i].uniqueId == items.id) {
                    itemIndex = i;
                }
            }
            const updateItem = {
                index: itemIndex,
                quantity: qtd,
            };

            return await window.vtexjs.checkout.updateItems(
                [updateItem],
                null,
                false
            );
        } catch (err) {
            console.log(err);
        }
    }

    async getCartItems() {
        try {
            const orderform = await this.checkout.getOrderForm();
            return this._mapOrderFormToCartItems(orderform);
        } catch (err) {
            return [];
        }
    }

    _mapOrderFormToCartItems(orderform) {
        if (orderform.items.length === 0) return [];
        return orderform.items.map(
            (item) =>
                new CartItem({
                    id: item.uniqueId,
                    imageUrl: item.imageUrl,
                    skuID: item.id,
                    productID: item.productId,
                    qtd: item.quantity,
                    price: item.price,
                    priceOf: item.listPrice,
                    name: item.name,
                    url: item.detailUrl,
                })
        );
    }
}
