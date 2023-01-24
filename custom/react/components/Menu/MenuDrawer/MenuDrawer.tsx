import React, { useState } from "react";
import { MenuItemInterface } from "../DynamicMenu";
import styles from "./MenuDrawer.css";
import { MenuHeaderMobile } from "../MenuHeaderMobile/MenuHeaderMobile";
import { MenuItemMobile } from "../MenuItemMobile/MenuItemMobile";
// import { MenuSearch } from "../MenuSearch/MenuSearch";
// import hamIcon from "../assets/menu.svg";

const MenuDrawer = ({ menuItems }: { menuItems: MenuItemInterface[] }) => {
    const [showDrawer, setShowDrawer] = useState(false);

    return (
        <>
            <button
                className={`${styles.MenuDrawerHamIcon}`}
                onClick={() => {
                    setShowDrawer(!showDrawer);
                }}
            >
                <div className={styles.icon}>
                    <span className={styles.line1}></span>
                    <span className={styles.line2}></span>
                </div>
            </button>

            <div
                className={`${styles.MenuDrawer} ${
                    showDrawer
                        ? styles.MenuDrawerShown
                        : styles.MenuDrawerHidden
                } `}
            >
                <MenuHeaderMobile
                    close={() => setShowDrawer(!showDrawer)}
                ></MenuHeaderMobile>
                {/* <MenuSearch /> */}
                <div className={styles.MenuDrawerContent}>
                    <div className={styles.MenuDrawerLinks}>
                        {menuItems.map((item, i) => {
                            return (
                                <div
                                    key={i}
                                    className={styles.wrapMenuItemMobile}
                                >
                                    <MenuItemMobile
                                        href={item.MenuItemProps?.href}
                                        title={item.MenuItemProps?.title}
                                        content={item.MenuItemProps?.content}
                                        items={item.MenuItemProps?.items}
                                        internal={item.MenuItemProps?.internal}
                                        banner={item.MenuItemProps?.banner}
                                        bannerUrl={
                                            item.MenuItemProps?.bannerUrl
                                        }
                                        MenuItemProps={item}
                                        key={i}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {showDrawer && (
                <div
                    className={styles.MenuDrawerOverlay}
                    onClick={() => setShowDrawer(false)}
                    aria-hidden="true"
                />
            )}
        </>
    );
};

export { MenuDrawer };
