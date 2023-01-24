import { useLayoutEffect, useState } from "react";
import breakPoints from "../utils/breakPoints";
import { debounce } from "../utils/debounce";

export type validation_type = "max" | "min" | "range";
export type screen_type = "phone" | "tablet" | "desktop"| string | number;
interface useResponsiveValidatorValues {
    type: validation_type
    width: screen_type,
    debounceTime?: number
}

function valiador(currentWidth:number, type:validation_type, width:screen_type) {
    if(type == "range" && typeof width === "string") {
        const [min, max] = width.replace(/ /g, "").split(",");
        return currentWidth >= breakPoints[min] && currentWidth < breakPoints[max];
    }
    const widthPx = breakPoints[width] || width;
    const isValid = type == "min"
        ? currentWidth >= widthPx
        : currentWidth < widthPx;
    return isValid;
}

function useResponsiveValidator({type, width, debounceTime}:useResponsiveValidatorValues):boolean {
    const [isValid, setIsValid] = useState(valiador(window.innerWidth, type, width));

    useLayoutEffect(() => {
        const updateSize = debounce(() => {
            setIsValid(valiador(window.innerWidth, type, width));
        }, debounceTime || 500);
        window.addEventListener("resize", updateSize);
        updateSize();
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    return isValid;
}

export default useResponsiveValidator;
