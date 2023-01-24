import { isSmallerThen768 } from "../helpers/MediasMatch";
import { alterarTamanhoImagemSrcVtex } from "../helpers/vtexUtils";
import waitForEl from "../helpers/waitForEl";

export default class CheckoutUI {
    constructor() {
        this.init();

        if (isSmallerThen768) {
            this.selectors();
            this.events();
            this.setFooterDropdown();
        }
    }

    selectors() {
        this.title = $(".footerCheckout__title");
        this.contents = $(".footerCheckout__content");
    }

    events() {
        this.title.click(this.toggleFooterDropdown.bind(this));
    }

    setFooterDropdown() {
        for (let i = 0; i < this.title.length; i++) {
            this.title[i].classList.add("dropdown__title");
            this.contents[i].classList.add("dropdown__content--closed");
        }
    }

    toggleFooterDropdown(event) {
        event.target.classList.toggle("closed");

        event.target.nextElementSibling.classList.toggle(
            "dropdown__content--closed"
        );
    }

    init() {
        this.configThumb();
        waitForEl(".product-image img", this.resizeImages.bind(this));
        $(window).on("orderFormUpdated.vtex", this.resizeImages.bind(this));
    }

    configThumb() {
        if (isSmallerThen768) {
            this.width = 73;
            this.height = 96;
        } else {
            this.width = 63;
            this.height = 83;
        }
    }

    resizeImages() {
        $(".product-image img").each((i, el) => {
            const $el = $(el);
            $el.attr(
                "src",
                alterarTamanhoImagemSrcVtex(
                    $el.attr("src"),
                    this.width,
                    this.height
                )
            );
        });
    }
}
