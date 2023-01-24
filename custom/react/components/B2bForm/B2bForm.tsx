import React, { useState } from "react";
import { Formik, FormikHelpers } from "formik";

import styles from "./B2bForm.css";
import { registerSchema } from "./B2bFormRegisterSchema";
import saveData from "./B2bFormSaveData";
import FormStep from "./steps/FormStep";
import SuccessStep from "./steps/SuccessStep";
import ErrorStep from "./steps/ErrorStep";

export interface FormFields {
    corporateDocument: string;
    document: string;
    postalCode: string;
    street: string;
    complement: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    corporateName: string;
    stateRegistration: string;
    tradeName: string;
    businessPhone: string;
    phone: string;
    firstName: string;
    lastName: string;
    email: string;
}

const initialValues: FormFields = {
    corporateDocument: "",
    document: "",
    postalCode: "",
    street: "",
    complement: "",
    number: "",
    neighborhood: "",
    city: "",
    state: "",
    corporateName: "",
    stateRegistration: "",
    tradeName: "",
    businessPhone: "",
    phone: "",
    firstName: "",
    lastName: "",
    email: "",
};


export const B2bForm: StorefrontFunctionComponent = () => {
    const [step, setStep] = useState<"form" | "success" | "error">("form");

    const onSubmit = async (values: FormFields, { setSubmitting }: FormikHelpers<FormFields>) => {
        try {
            await saveData(values);
            setSubmitting(false);
            setStep("success");
        } catch (error) {
            setSubmitting(false);
            setStep("error");
        }
    };

    return (
        <div className={styles.container}>
            <Formik
                initialValues={initialValues}
                validationSchema={registerSchema}
                onSubmit={onSubmit}
            >
                {() => (
                    <>
                        {step === "form" && (<FormStep></FormStep>)}
                        {step === "success" && (<SuccessStep></SuccessStep>)}
                        {step === "error" && (<ErrorStep></ErrorStep>)}
                    </>
                )}
            </Formik>
        </div >
    );
};
