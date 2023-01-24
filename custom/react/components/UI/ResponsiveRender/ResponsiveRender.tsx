import React from "react";
import useResponsiveValidator, { screen_type, validation_type } from "../../../hooks/useResponsiveValidator";

interface ResponsiveRenderProps {
  children: JSX.Element[],
  type: validation_type
  width: screen_type,
}

const ResponsiveRender = ({ children, type, width}: ResponsiveRenderProps): JSX.Element => {
    const canRender = useResponsiveValidator({type, width});

    return(
        <>
            {canRender ? children : <></>}
        </>
    );
};

export default ResponsiveRender;
