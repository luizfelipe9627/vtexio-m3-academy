/* eslint-disable no-prototype-builtins */
import React, { useEffect, useState } from "react";
import { MenuItemProps, SubMenuItemProps } from "../DynamicMenu";
import { Link } from "vtex.render-runtime";

import styles from "./MenuItem.css";
import { SubMenuBanner } from "../SubMenuBanner";

export const MenuItem: React.FC<MenuItemProps> = ({
    href,
    title,
    content,
    internal,
    items,
    banner,
    bannerUrl,
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

    const isEmpty = (obj: SubMenuItemProps[]) => {
        for (const prop in obj) {
            if (obj.hasOwnProperty(prop)) return true;
        }
        return false;
    };

    return (
        <>
            <li
                className={styles.menuItem}
                onMouseEnter={() => {
                    setShowSubMenu(!showSubMenu);
                }}
                onMouseLeave={() => {
                    setShowSubMenu(!showSubMenu);
                }}
            >
                <Link
                    className={styles.menuItemLink}
                    to={href}
                    title={content}
                    target={internal ? "_self" : "_blank"}
                >
                    {title}
                </Link>
                {isEmpty(subMenuItems) && showSubMenu && (
                    <div className={styles.dynamicSubMenuContainer}>
                        <div className={styles.dynamicSubMenuWrapper}>
                            <ul className={styles.dynamicSubMenuItems}>
                                {subMenuItems.map((item, i) => {
                                    let isNextItemHighlight = false;
                                    if (i > 0 || i !== subMenuItems.length) {
                                        isNextItemHighlight = subMenuItems[
                                            i + 1
                                        ]?.highlight
                                            ? true
                                            : false;
                                    }

                                    return (
                                        <>
                                            <li
                                                key={i}
                                                className={`${
                                                    styles.subMenuItem
                                                }
                                                ${
                                        isNextItemHighlight &&
                                                    styles.subMenuLastItem
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
                                                        styles.subMenuLink
                                                    } ${
                                                        item.highlight &&
                                                        styles.subMenuLinkHighlight
                                                    }`}
                                                >
                                                    {item.title}
                                                </Link>
                                            </li>
                                            {/* {isNextItemHighlight && (
                                                <li
                                                    className={
                                                        styles.subMenuItemBreak
                                                    }
                                                >
                                                    <span> &nbsp; </span>
                                                </li>
                                            )} */}
                                        </>
                                    );
                                })}
                            </ul>
                            {banner && (
                                <SubMenuBanner
                                    bannerImg={banner}
                                    bannerUrl={bannerUrl ? bannerUrl : ""}
                                />
                            )}
                        </div>
                    </div>
                )}
            </li>
        </>
    );
};
