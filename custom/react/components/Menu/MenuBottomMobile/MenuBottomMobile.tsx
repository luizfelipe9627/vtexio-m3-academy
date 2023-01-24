import React, { useEffect } from "react";

import styles from "./MenuBottomMobile.css";
import userIcon from "../assets/userIcon.svg";
import GET_SESSION from "../../../graphql/query/GET_SESSION.graphql";
import { useLazyQuery } from "react-apollo";
import { Spinner } from "vtex.styleguide";
import { Link } from "vtex.render-runtime";

const MenuBottomMobile = () => {
    const [getSession, { data, loading }] = useLazyQuery(
        GET_SESSION,
        {
            fetchPolicy: "network-only",
        }
    );

    useEffect(() => {
        getSession();
    }, []);

    if (!data || loading) {
        return (
            <div className={styles.MenuBottomMobile}>
                <Spinner />
            </div>
        );
    }

    if (data.getSession.profile === null) {
        return (
            <div className={styles.MenuBottomMobile}>
                <div className={styles.MenuBottomMobileContent}>
                    <img
                        className={styles.MenuBottomMobileUserIcon}
                        src={userIcon}
                        alt="User Icon"
                    />
                    <Link
                        className={styles.MenuBottomMobileLink}
                        to="/login"
                        title="login"
                        target="_self"
                    >
                        Entrar
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.MenuBottomMobile}>
            <div className={styles.MenuBottomMobileContent}>
                <img
                    className={styles.MenuBottomMobileUserIcon}
                    src={userIcon}
                    alt="User Icon"
                />
                <Link
                    className={styles.MenuBottomMobileLink}
                    to="/account#/profile"
                    title="account"
                    target="_self"
                >
                    Minha Conta
                </Link>
                <span className={styles.MenuBottomMobileSeparator}></span>
                <Link
                    className={styles.MenuBottomMobileLink}
                    to="/account#/orders"
                    title="account"
                    target="_self"
                >
                    Meus Pedidos
                </Link>
            </div>
        </div>
    );
};

export { MenuBottomMobile };
