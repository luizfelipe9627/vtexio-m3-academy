import React from "react";

import styles from "./Steps.css";

export default function ErrorStep() {
    return (
        <div className={styles.fail}>
            <h1 className={styles.title}>Falha ao realizar cadastro</h1>
            <p className={styles.subtitle}>Infelizmente houve um problema ao comunicar com o servidor</p>
        </div>
    );
}
