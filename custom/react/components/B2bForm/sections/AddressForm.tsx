import React from "react";
import { M3CepField } from "../Fields/M3CepField";
import { M3Field } from "../Fields/M3Field";

import styles from "./SectionFormStyles.css";

export const AddressForm: StorefrontFunctionComponent = () => {
    return (
        <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Endereço Comercial</h2>
            <div className={styles.sectionGroup}>
                <M3CepField name="postalCode" label="CÓDIGO POSTAL:"></M3CepField>
                <M3Field name="street" label="ENDEREÇO:"></M3Field>
                <M3Field name="number" label="NÚMERO:" type="number"></M3Field>
                <M3Field name="complement" label="COMPLEMENTO:"></M3Field>
                <M3Field name="neighborhood" label="BAIRRO:"></M3Field>
                <M3Field name="city" label="CIDADE:"></M3Field>
                <M3Field name="state" label="ESTADO:"></M3Field>
            </div>
        </section>
    );
};
