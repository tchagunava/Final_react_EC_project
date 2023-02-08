import { useState } from "react";

export const useForm = ({ defaultFormValues }) => {
    const [formValues, setFormvalues] = useState(defaultFormValues);
    const onInputChange = (e) => {
        const inputName = e.target.name;
        const { validateInput } = formValues[inputName];
        setFormvalues((prevFormValues) => {
            return {
                ...prevFormValues,
                [inputName]: {
                    ...prevFormValues[inputName],
                    value: e.target.value,
                    error: validateInput ? validateInput(e.target.value) : "",
                },
            };
        });
    };

    const checkButtonDisable = (values) => {
        for (const [key, objValue] of Object.entries(values)) {
            if (objValue.required && (objValue.error || !objValue.value))
                return true;
        }
    }

    const clearForm = (obj) => {
        setFormvalues(obj);
    };

    return {
        formValues,
        setFormvalues,
        onInputChange,
        clearForm,
        checkButtonDisable,
    };
};