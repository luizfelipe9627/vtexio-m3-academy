import { useFormikContext } from "formik";
import React from "react";
import { ExtensionPoint } from "vtex.render-runtime";

import styles from "./Steps.css";
import { FormFields } from "../B2bForm";
import { AddressForm } from "../sections/AddressForm";
import { CompanyForm } from "../sections/CompanyForm";
import { ContactForm } from "../sections/ContactForm";

export default function FormStep() {
    const { handleSubmit, isSubmitting } = useFormikContext<FormFields>();
    return (
        <>
            <div className={styles.heading}>
                <ExtensionPoint id="form-heading" />
            </div>
            <h2 className={styles.title}>Cadastre-se</h2>
            <p className={styles.subtitle}>Se você é um comerciante ou revendedor e deseja vender nossos produtos, preencha o formulário
a seguir. Depois de verificar seus dados, iremos registrá-lo como atacadista</p>
            <form className={styles.form} onSubmit={handleSubmit}>
                <ContactForm></ContactForm>
                <CompanyForm></CompanyForm>
                <AddressForm></AddressForm>
                <div className={styles.submitBtnWrapper}>
                    <button className={styles.submitBtn} type="submit" disabled={isSubmitting}>Enviar</button>
                </div>
            </form>
        </>
    );
}
