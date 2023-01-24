import { useFormikContext } from "formik";
import React from "react";

import styles from "./M3Field.css";
import { FormFields } from "../B2bForm";

export interface FieldProps {
    type?: string;
    name: keyof FormFields; // "cnpj" | "cep" | "endereco" | "complemento" | "numero" ...
    label: string;
}

export const M3Field: StorefrontFunctionComponent<FieldProps> = (
    { type, name, label }: FieldProps) => {
    const { values, touched, handleChange, handleBlur, errors } = useFormikContext<FormFields>();

    return <div className={`${styles.fieldGroup} ${errors[name] && touched[name] && styles.fieldGroupError}`}>
        <label htmlFor={name} className={styles.fieldLabel}>{label}</label>
        <input
            type={type ? type : "text"}
            name={name}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values[name]}
            className={styles.fieldInput}
        />
        <span className={styles.error}> {errors[name] && touched[name] && errors[name]}</span>
    </div>;
};
