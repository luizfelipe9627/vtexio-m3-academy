import React from "react";

import styles from "./Steps.css";

export default function SuccessStep() {
    return (
        <div className={styles.success}>
            <h1 className={styles.title}>Registro realizado com sucesso</h1>
            <p className={styles.subtitle}>Receberá um e-mail com informações do seu cadastro</p>
        </div>
    );
}
