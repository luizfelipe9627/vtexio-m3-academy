import React from "react";
import styles from "./DynamicMenu.css";
import { MenuDrawer } from "./MenuDrawer/MenuDrawer";
import { MenuItem } from "./MenuItem/MenuItem";
interface MenuSchema {
    items: MenuItemInterface[];
    isMobile: boolean;
}
export interface MenuItemInterface {
    MenuItemProps: MenuItemProps;
}
export interface SubMenuItemProps {
    iconSrc?: string;
    title?: any;
    href?: any;
    internal: boolean;
    highlight: boolean;
    content?: any;
    SubMenuItemProps?: SubMenuItemProps;
}
export interface MenuItemProps {
    iconSrc?: string;
    title?: string;
    href?: string;
    internal?: boolean;
    content?: string;
    items?: SubMenuItemProps[];
    banner?: string;
    bannerUrl?: string;
    MenuItemProps?: MenuItemProps;
}

export const DynamicMenu: StorefrontFunctionComponent<MenuSchema> = (
    props: MenuSchema
) => {
    if (!props.items) return <></>;

    if (props.isMobile) {
        return (
            <>
                <MenuDrawer menuItems={props.items} />
            </>
        );
    }

    return (
        <nav className={styles.nav}>
            <ul className={styles.menu}>
                {props.items.map((item, i) => {
                    if(!item) return <></>;

                    return (
                        <MenuItem
                            href={
                                item.MenuItemProps?.href
                                    ? item.MenuItemProps?.href
                                    : ""
                            }
                            title={item.MenuItemProps?.title}
                            content={item.MenuItemProps?.content}
                            items={item.MenuItemProps?.items}
                            internal={item.MenuItemProps?.internal}
                            banner={item.MenuItemProps?.banner}
                            bannerUrl={item.MenuItemProps?.bannerUrl}
                            MenuItemProps={item}
                            key={i}
                        />
                    );
                })}
            </ul>
        </nav>
    );
};

DynamicMenu.schema = {
    title: "Menu Dinâmico",
};
