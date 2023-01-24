import CheckoutUI from "./components/CheckoutUI";
import { Container } from "m3-utils";
import Exemple from "./components/Exemple";
import ExempleEvent from "./components/ExempleEvent";
// import CatalogService from "./services/CatalogService";
// import CheckoutService from "./services/checkout/CheckoutService";

const m3Checkout = new Container({
    appName: "m3-checkout",
    // services: [CatalogService, CheckoutService],
    components: [CheckoutUI, Exemple, ExempleEvent],
});

m3Checkout.start();
