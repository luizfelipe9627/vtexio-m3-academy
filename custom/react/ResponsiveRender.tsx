import ResponsiveRender from "./components/UI/ResponsiveRender/ResponsiveRender";
export default ResponsiveRender;


/*
    props: {
        type: "min" | "max", "range"
        width: "phone" | "tablet" | "desktop" |  number(in pixels)
    },
    children: []


    --- Storefront Exemples ---

    "m3-responsive-render#titulo-desktop": {
        "props": {
            "type": "min",
            "width": "desktop"
        },
        "children":["rich-text#titulo"]
    }

    - Range -
    "m3-responsive-render#titulo-desktop": {
        "props": {
            "type": "range",
            "width": "tablet, desktop"
        },
        "children":["rich-text#titulo-tablet"]
    }

*/
