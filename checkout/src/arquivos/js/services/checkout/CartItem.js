export default class CartItem {
    constructor({
        productID,
        skuID,
        url,
        imageUrl,
        name,
        priceOf,
        price,
        maxInstallmentAmount,
        maxInstallmentValue,
        qtd,
        id,
        availableQtd,
    }) {
        this.id = id;
        this.productID = productID;
        this.skuID = skuID;
        this.url = url;
        this.imageUrl = imageUrl;
        this.name = name;
        this.priceOf = priceOf;
        this.price = price;
        this.maxInstallmentAmount = maxInstallmentAmount;
        this.maxInstallmentValue = maxInstallmentValue;
        this.qtd = qtd;
        this.availableQtd = availableQtd;
    }
}
