import { useState, useEffect } from "react";
import CrossSellingService from "../services/CrossSellingRestService";
import {
    ICrossSellingService,
    IProducts,
} from "../services/ICrosselingService";

const crossSellingService: ICrossSellingService = new CrossSellingService();

type CrossSellingTypes = "accessories" | "similars" | "suggestions";

export function useCrossSelling(
    type: CrossSellingTypes,
    productId: string
): [IProducts[] | null, boolean] {
    const [products, setProducts] = useState<null | IProducts[]>(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        async function getSimilars() {
            setLoading(true);
            switch (type) {
            case "accessories":
                setProducts(
                    await crossSellingService.accessories(productId)
                );
                break;
            case "similars":
                setProducts(await crossSellingService.similars(productId));
                break;
            case "suggestions":
                setProducts(
                    await crossSellingService.suggestions(productId)
                );
                break;
            }
            setLoading(false);
        }

        getSimilars();
    }, [crossSellingService]);

    return [products, loading];
}
