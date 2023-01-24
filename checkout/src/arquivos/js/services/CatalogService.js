export default class CatalogService {
    async getSkusData(skus) {
        const skusPromises = skus.map(this.getSkuData);

        const responses = await Promise.all(skusPromises);

        return Promise.all(responses.map((r) => r.json()));
    }

    getSkuData(sku) {
        const urlSku = "/produto/sku/" + sku;

        return fetch(urlSku, {
            method: "GET",
        });
    }
}
