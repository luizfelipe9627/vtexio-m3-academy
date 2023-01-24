/* eslint-disable no-prototype-builtins */
import React, { useEffect, useState } from "react";
import { MenuItemProps, SubMenuItemProps } from "../DynamicMenu";
import { Link } from "vtex.render-runtime";

import styles from "./MenuItemMobile.css";

const MenuItemMobile: React.FC<MenuItemProps> = ({
    href,
    title,
    content,
    internal,
    items,
}: MenuItemProps) => {
    const [subMenuItems, setSubMenuItems] = useState<SubMenuItemProps[]>([]);
    const [showSubMenu, setShowSubMenu] = useState(false);

    const standardizeSubItems = () => {
        const newItems = items?.map((item) => {
            if (item.hasOwnProperty("SubMenuItemProps")) {
                return item.SubMenuItemProps;
            }
            return item;
        });
        setSubMenuItems(newItems as []);
    };

    useEffect(() => {
        if (items) {
            standardizeSubItems();
        }
    }, [items]);

    return (
        <>
            <div className={styles.menuItemMobile}>
                {subMenuItems.length === 0 ? (
                    <Link
                        className={styles.menuItemMobileLink}
                        to={href}
                        title={content}
                        target={internal ? "_self" : "_blank"}
                    >
                        {title}
                    </Link>
                ) : (
                    <button
                        className={styles.menuItemMobileSubToggler}
                        onClick={() => setShowSubMenu(!showSubMenu)}
                    >
                        {title}
                    </button>
                )}
                {subMenuItems && (
                    <div
                        className={`${styles.menuItemSubMenuContainer} ${
                            showSubMenu
                                ? styles.menuItemSubMenuShown
                                : styles.menuItemSubMenuHidden
                        }`}
                    >
                        <button
                            className={styles.menuItemSubMenuClose}
                            onClick={() => setShowSubMenu(false)}
                        >
                            voltar
                        </button>

                        <a href={href} className={styles.titleMobile}>
                            {title}
                        </a>

                        <ul className={styles.menuItemSubMenuItems}>
                            {subMenuItems.map((item, i) => {
                                let isNextItemHighlight = false;
                                if (i > 0 || i !== subMenuItems.length) {
                                    isNextItemHighlight = subMenuItems[i + 1]
                                        ?.highlight
                                        ? true
                                        : false;
                                }

                                return (
                                    <>
                                        <li
                                            key={i}
                                            className={`${
                                                styles.menuItemSubMenuItem
                                            }
                                        ${
                                    isNextItemHighlight &&
                                            styles.menuItemSubMenuLastItem
                                    }`}
                                        >
                                            <Link
                                                to={item.href}
                                                title={item.content}
                                                target={
                                                    item.internal
                                                        ? "_self"
                                                        : "_blank"
                                                }
                                                className={`${
                                                    styles.menuItemSubMenuLink
                                                } ${
                                                    item.highlight &&
                                                    styles.menuItemSubMenuLinkHighlight
                                                }`}
                                                data-highlight={item.highlight}
                                                onClick={() => {
                                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                                    // @ts-ignore
                                                    Location.reload();
                                                }}
                                            >
                                                {item.title}
                                            </Link>
                                        </li>
                                        {isNextItemHighlight && (
                                            <li
                                                className={
                                                    styles.subMenuItemBreak
                                                }
                                            >
                                                <span> &nbsp; </span>
                                            </li>
                                        )}
                                    </>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
};

export { MenuItemMobile };
