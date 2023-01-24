import React, { useEffect } from "react";
// import lockIcon from "../assets/lock.png";
import closeIcon from "../assets/closeIcon.svg";
import GET_SESSION from "../../../graphql/query/GET_SESSION.graphql";
import { useLazyQuery } from "react-apollo";
import { Spinner } from "vtex.styleguide";
import { Link } from "vtex.render-runtime";
// import userIcon from "../assets/userIcon.svg";

import styles from "./MenuHeaderMobile.css";

const MenuHeaderMobile = ({ close }: { close: () => void }) => {
    const [getSession, { data, loading }] = useLazyQuery(
        GET_SESSION,
        {
            fetchPolicy: "network-only",
        }
        // { variables: { language: "english" } }
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
            <div className={styles.menuMobileHeader}>
                <div className={styles.menuMobileLogin}>
                    <div>
                        <Link
                            className={styles.menuLink}
                            to="/login"
                            title="login"
                            target="_self"
                        >
                            Entre ou faça login
                        </Link>
                    </div>

                    <button
                        className={styles.menuMobileHeaderClose}
                        onClick={close}
                    >
                        <img
                            src={closeIcon}
                            className={styles.menuMobileHeaderCloseIcon}
                            alt="Close Icon"
                        />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.menuMobileHeader}>
            <button className={styles.menuMobileHeaderClose} onClick={close}>
                <img
                    src={closeIcon}
                    className={styles.menuMobileHeaderCloseIcon}
                    alt="Close Icon"
                />
            </button>
            <div className={styles.menuMobileLogin}>
                <Link
                    className={styles.menuLink}
                    to="/account#/profile"
                    title="account"
                    target="_self"
                >
                    Minha Conta
                </Link>
            </div>
        </div>
    );

    // return (
    //     <div className={styles.menuMobileHeader}>
    //         <div className={styles.menuMobileHeaderText}>
    //         <img src={lockIcon} className={styles.menuMobileLockIcon} alt="Lock Icon" />
    //         <span className={styles.menuMobileHeaderTextSpan}>compra 100% segura</span>
    //     </div>
    //         <button className={styles.menuMobileHeaderClose} onClick={close}>
    //             <img
    //                 src={closeIcon}
    //                 className={styles.menuMobileHeaderCloseIcon}
    //                 alt="Close Icon"
    //             />
    //         </button>
    //     </div>
    // );
};

export { MenuHeaderMobile };
