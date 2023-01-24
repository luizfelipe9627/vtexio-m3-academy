import React from "react";
import SearchBarContainer from "vtex.store-components/SearchBar";
import styles from "./MenuSearch.css";

const MenuSearch = () => {

    return (
        <div className={styles.MenuSearch}>
            <SearchBarContainer/>
        </div>
    );
};

export { MenuSearch };
