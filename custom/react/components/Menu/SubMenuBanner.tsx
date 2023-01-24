import React from "react";
// import { Link } from "vtex.render-runtime";

import styles from "./SubMenuBanner.css";

const SubMenuBanner = ({ bannerImg, bannerUrl }: {
    bannerImg: string, bannerUrl: string
 }) => {

    return (
        <div className={styles.SubMenuBanner}>
            <a href={bannerUrl}>
                <img src={bannerImg} alt=""/>
            </a>
        </div>
    );
};
export {SubMenuBanner};
