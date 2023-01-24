/* eslint-disable no-inner-declarations */
declare module "vtex.order-manager/OrderQueue" {
    export * from "vtex.order-manager/react/OrderQueue";
    export { default } from "vtex.order-manager/react/OrderQueue";

    export const QueueStatus = {
        PENDING: "Pending",
        FULFILLED: "Fulfilled",
    } as const;
}

declare module "vtex.order-manager/OrderForm" {
    import { createContext, useContext } from "react";
    import type { DEFAULT_ORDER_FORM } from "@vtex/order-manager/src/constants";
    import type { Context, OrderForm } from "@vtex/order-manager/src/typings";

    type DefaultOrderForm = typeof DEFAULT_ORDER_FORM;
    type DefaultOrderFormOmited = Omit<DefaultOrderForm, "items">;
    type DefaultOrderFormUpdated = DefaultOrderFormOmited & {
        items: OrderFormItem[] | null;
    };

    export const OrderFormContext = createContext<Context<OrderForm>>({
        orderForm: DefaultOrderFormUpdated,
        setOrderForm: noop,
        error: undefined,
        loading: false,
    });

    function useOrderForm<O extends OrderForm = DefaultOrderFormUpdated>() {
        const context = useContext(OrderFormContext);

        if (context === undefined) {
            throw new Error(
                "useOrderForm must be used within a OrderFormProvider"
            );
        }
        return context as Context<O>;
    }

    export type OrderFormItem = {
        additionalInfo: {
            brandName: string;
            __typename: string;
        };
        attachments: Array<any>;
        attachmentOfferings: Array<any>;
        bundleItems: Array<any>;
        parentAssemblyBinding: any;
        parentItemIndex: any;
        sellingPriceWithAssemblies: any;
        options: any;
        availability: string;
        detailUrl: string;
        id: string;
        imageUrls: Record<string, string>;
        listPrice: number;
        manualPrice: any;
        measurementUnit: string;
        modalType: any;
        name: string;
        offerings: Array<any>;
        price: number;
        priceTags: Array<any>;
        productCategories: Record<string, string>;
        productCategoryIds: string;
        productRefId: string;
        productId: string;
        quantity: number;
        seller: string;
        sellingPrice: number;
        skuName: string;
        skuSpecifications: Array<any>;
        unitMultiplier: number;
        uniqueId: string;
        refId: string;
        isGift: boolean;
        priceDefinition: {
            calculatedSellingPrice: number;
            total: number;
            sellingPrices: Array<{
                quantity: number;
                value: number;
                __typename: string;
            }>;
            __typename: string;
        };
        __typename: string;
    };

    export { OrderFormProvider, useOrderForm };
    declare const _default: {
        OrderFormProvider: import("react").FC<Record<string, never>>;
        useOrderForm: typeof useOrderForm;
    };
    export default _default;
}

declare module "vtex.order-manager/constants" {
    export * from "vtex.order-manager/react/constants";
}


