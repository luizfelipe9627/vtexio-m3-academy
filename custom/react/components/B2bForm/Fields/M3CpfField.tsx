import { useFormikContext } from "formik";
import React from "react";
import InputMask from "react-input-mask";

import styles from "./M3Field.css";
import { FormFields } from "../B2bForm";
import { FieldProps } from "./M3Field";

export const M3CpfField: StorefrontFunctionComponent<FieldProps> = (
    { type, name, label }: FieldProps) => {
    const { values, touched, handleChange, handleBlur, errors } = useFormikContext<FormFields>();

    return <div className={`${styles.fieldGroup} ${errors[name] && touched[name] && styles.fieldGroupError}`}>
        <label htmlFor={name} className={styles.fieldLabel}>{label}</label>
        <InputMask
            mask="999.999.999-99"
            type={type ? type : "text"}
            name={name}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values[name]}
            className={styles.fieldInput}
        />
        <span className={styles.error}> {errors[name] && touched[name] && errors[name]} </span>
    </div>;
};
