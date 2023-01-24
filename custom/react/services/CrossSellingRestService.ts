import { ICrossSellingService, IProducts } from "./ICrosselingService";


class CrossSellingService implements ICrossSellingService {
    private _url = {
        similars: "/api/catalog_system/pub/products/crossselling/similars/",
        suggestions: "/api/catalog_system/pub/products/crossselling/suggestions/",
        accessories: "/api/catalog_system/pub/products/crossselling/accessories/",
    }

    public async similars(id: string) {
        const res = await this._loadProduct("similars", id);
        return this._cleanProducts(res);
    }

    public async suggestions(id: string) {
        const res = await this._loadProduct("suggestions", id);
        return this._cleanProducts(res);
    }
    public async accessories(id: string) {
        const res = await this._loadProduct("accessories", id);
        return this._cleanProducts(res);
    }

    private async _loadProduct(
        type: "similars" | "suggestions" | "accessories",
        id: string
    ) {
        if (Reflect.has(this._url, type)) {
            return await (await fetch(`${this._url[type]}/${id}`)).json();
        }

        return false;
    }

    private _cleanProducts(products: IProducts[]) {
        const cleanProducts = [];
        const usedIds = [];

        // cria lista sem repetiçaõ de produtos
        for (let i = 0; i < products.length; i++) {
            const item = products[i];
            if (usedIds.indexOf(item.productId) < 0) {
                cleanProducts.push({ ...item });
                usedIds.push(item.productId);
            }
        }

        return cleanProducts;
    }
}

export default CrossSellingService;
